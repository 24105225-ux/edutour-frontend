import { ref, reactive, watch } from 'vue'

// Khai báo state toàn cục (Singleton) để mọi component dùng chung trạng thái
const isDark = ref(localStorage.getItem('edutour_theme') === 'dark')
const isEnglish = ref(localStorage.getItem('edutour_lang') === 'en')

// 1. Từ điển chuẩn cho các thuật ngữ cố định trên giao diện (nhảy tức thì 0ms)
const staticDictionary: Record<string, string> = {
  'Nền tảng chuẩn hóa du lịch học đường': 'Standardized School Tourism Platform',
  'Hành Trình Trải Nghiệm - Gắn Liền Mục Tiêu Giáo Dục': 'Experiential Journey - Connecting Educational Goals',
  'Nền tảng kết nối Nhà trường, Phụ huynh và Đơn vị tổ chức. Đảm bảo an toàn, minh bạch hồ sơ y tế và bám sát khung chương trình GDPT.': 'Platform connecting Schools, Parents, and Organizers. Ensuring safety, medical records compliance, and adherence to the GDPT curriculum.',
  'TRƯỜNG HỌC': 'SCHOOLS',
  'HỌC SINH': 'STUDENTS',
  'CHƯƠNG TRÌNH': 'PROGRAMS',
  'Tra cứu đơn hàng': 'Order Tracking',
  'Đánh giá tour': 'Tour Reviews',
  'Đổi Giao Diện': 'Dark Mode',
  '☀️ Giao Diện Sáng': '☀️ Light Mode',
  '🌙 Đổi Giao Diện': '🌙 Dark Mode',
  'Đăng nhập hệ thống': 'System Login',
  'Đăng xuất': 'Logout',
  'Tài khoản': 'Account',
  'Khám phá theo lĩnh vực môn học:': 'Explore by academic subject:',
  'Tất cả lĩnh vực': 'All Subjects',
  'Lịch sử - Văn hóa': 'History - Culture',
  'Sinh học - Môi trường': 'Biology - Environment',
  'Địa lý - Địa chất': 'Geography - Geology',
  'Khoa học - Công nghệ': 'Science - Technology',
  'LỊCH SỬ': 'HISTORY',
  'SINH HỌC': 'BIOLOGY',
  'ĐỊA LÝ': 'GEOGRAPHY',
  'CÔNG NGHỆ': 'TECHNOLOGY',
  'TRẢI NGHIỆM': 'EXPERIENCE',
  'Danh Mục Chương Trình Tiêu Biểu': 'Featured Program Catalog',
  'Ánh xạ trực tiếp từ yêu cầu cần đạt của Bộ GD&ĐT.': 'Directly mapped to the Ministry of Education & Training requirements.',
  'Tìm tên tour, điểm đến...': 'Search tour name, destination...',
  'Tất cả cấp học': 'All Grade Levels',
  'Tiểu học': 'Primary School',
  'THCS': 'Secondary (THCS)',
  'THPT': 'High School (THPT)',
  'Cấp: Tiểu học': 'Level: Primary',
  'Cấp: THCS': 'Level: Secondary',
  'Cấp: THPT': 'Level: High School',
  'Hà Nội & Các tỉnh lân cận': 'Hanoi & Neighboring Provinces',
  'Y tế đi kèm, 100% bảo hiểm': 'Medical staff included, 100% insured',
  'Xem chi tiết': 'View Details',
  'Khoảnh Khắc Trải Nghiệm Thực Tế': 'Real-World Experiential Moments',
  'Bấm nút điều hướng để xem các góc máy ghi lại hành trình thực địa.': 'Click navigation buttons to view moments captured during field trips.',
  'Trước': 'Prev',
  'Sau': 'Next',
  'Đánh Giá Từ Ban Giám Hiệu & Giáo Viên': 'Reviews from School Boards & Teachers',
  'Sự tín nhiệm của các nhà trường là minh chứng rõ nét nhất cho chất lượng dịch vụ.': 'The trust of schools is the clearest testament to our service quality.',
  'Về trang chủ': 'Back to Home'
}

// 2. Bộ nhớ đệm lưu các câu dịch tự động từ API (bao gồm cả dữ liệu từ Database)
const savedCache = JSON.parse(localStorage.getItem('edutour_i18n_cache') || '{}')
const dynamicCache = reactive<Record<string, string>>(savedCache)
const pendingRequests = new Set<string>()

// Lưu trữ text gốc tiếng Việt của các thẻ DOM để khôi phục khi bấm về Tiếng Việt
const originalTextMap = new WeakMap<Node, string>()
let observer: MutationObserver | null = null
let debounceTimer: any = null

// Kiểm tra xem chuỗi có chứa ký tự tiếng Việt không
const hasVietnamese = (str: string) => {
  return /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(str)
}

// Hàm gọi Google Translate API miễn phí cho các đoạn text chưa có trong từ điển
const translateViaAPI = async (text: string): Promise<string> => {
  const cleanText = text.trim()
  if (!cleanText || staticDictionary[cleanText] || dynamicCache[cleanText]) {
    return staticDictionary[cleanText] || dynamicCache[cleanText] || text
  }

  if (pendingRequests.has(cleanText)) return text
  pendingRequests.add(cleanText)

  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=vi&tl=en&dt=t&q=${encodeURIComponent(cleanText)}`
    const res = await fetch(url)
    const data = await res.json()
    const translated = data[0].map((item: any) => item[0]).join('')
    
    if (translated) {
      dynamicCache[cleanText] = translated
      localStorage.setItem('edutour_i18n_cache', JSON.stringify(dynamicCache))
      return translated
    }
  } catch (e) {
    console.warn('Auto-translate fallback:', e)
  } finally {
    pendingRequests.delete(cleanText)
  }
  return text
}

// 3. Bộ quét toàn bộ DOM trên trang web để dịch tự động (kể cả chỗ không bọc hàm t)
const scanAndTranslateDOM = async () => {
  if (typeof document === 'undefined' || !document.body) return

  // Dịch các ô input placeholder
  const inputs = document.querySelectorAll('input[placeholder], textarea[placeholder]')
  inputs.forEach(async (el: any) => {
    if (!el.dataset.viPlaceholder) {
      el.dataset.viPlaceholder = el.placeholder
    }
    const orig = el.dataset.viPlaceholder
    if (isEnglish.value) {
      el.placeholder = staticDictionary[orig] || dynamicCache[orig] || await translateViaAPI(orig)
    } else {
      el.placeholder = orig
    }
  })

  // Quét toàn bộ Text Node trên trang
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) => {
      const parent = node.parentElement
      if (!parent) return NodeFilter.FILTER_REJECT
      const tag = parent.tagName.toLowerCase()
      if (['script', 'style', 'noscript'].includes(tag)) return NodeFilter.FILTER_REJECT
      // Không dịch chính cái nút đổi ngôn ngữ
      if (node.nodeValue?.includes('English') || node.nodeValue?.includes('Tiếng Việt')) {
        return NodeFilter.FILTER_REJECT
      }
      return NodeFilter.FILTER_ACCEPT
    }
  })

  const nodesToProcess: Text[] = []
  let currentNode = walker.nextNode()
  while (currentNode) {
    nodesToProcess.push(currentNode as Text)
    currentNode = walker.nextNode()
  }

  for (const textNode of nodesToProcess) {
    const currentVal = textNode.nodeValue || ''
    const trimmed = currentVal.trim()
    if (!trimmed) continue

    // Lưu lại bản gốc tiếng Việt nếu chưa lưu
    if (!originalTextMap.has(textNode) && (hasVietnamese(trimmed) || staticDictionary[trimmed])) {
      originalTextMap.set(textNode, currentVal)
    }

    const originalVal = originalTextMap.get(textNode)
    if (!originalVal) continue

    const origTrimmed = originalVal.trim()

    if (isEnglish.value) {
      // Nếu đã có trong từ điển hoặc cache thì thay thế ngay
      const fastTrans = staticDictionary[origTrimmed] || dynamicCache[origTrimmed]
      if (fastTrans) {
        const newVal = originalVal.replace(origTrimmed, fastTrans)
        if (textNode.nodeValue !== newVal) textNode.nodeValue = newVal
      } else if (hasVietnamese(origTrimmed)) {
        // Nếu là câu mới (ví dụ tour mới từ DB), gọi API dịch tự động
        translateViaAPI(origTrimmed).then((trans) => {
          if (isEnglish.value && trans !== origTrimmed) {
            textNode.nodeValue = originalVal.replace(origTrimmed, trans)
          }
        })
      }
    } else {
      // Khôi phục về tiếng Việt gốc
      if (textNode.nodeValue !== originalVal) {
        textNode.nodeValue = originalVal
      }
    }
  }
}

// Kích hoạt bộ theo dõi DOM tự động mỗi khi chuyển trang hoặc tải API xong
const startDOMObserver = () => {
  if (observer || typeof window === 'undefined') return
  observer = new MutationObserver(() => {
    if (!isEnglish.value) return
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
      scanAndTranslateDOM()
    }, 150)
  })
  observer.observe(document.body, { childList: true, subtree: true })
}

export function useApp() {
  const initTheme = () => {
    if (isDark.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    startDOMObserver()
    if (isEnglish.value) {
      setTimeout(() => scanAndTranslateDOM(), 200)
    }
  }

  const toggleTheme = () => {
    isDark.value = !isDark.value
    localStorage.setItem('edutour_theme', isDark.value ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', isDark.value)
  }

  const toggleLanguage = () => {
    isEnglish.value = !isEnglish.value
    localStorage.setItem('edutour_lang', isEnglish.value ? 'en' : 'vi')
    setTimeout(() => scanAndTranslateDOM(), 50)
  }

  // Hàm t() dùng trong template vẫn hoạt động bình thường và tự động học từ mới
  const t = (key: string) => {
    if (!key || !isEnglish.value) return key
    const clean = key.trim()
    if (staticDictionary[clean]) return staticDictionary[clean]
    if (dynamicCache[clean]) return dynamicCache[clean]
    
    if (hasVietnamese(clean)) {
      translateViaAPI(clean)
    }
    return key
  }

  watch(isEnglish, () => {
    setTimeout(() => scanAndTranslateDOM(), 50)
  })

  return {
    isDark,
    isEnglish,
    t,
    initTheme,
    toggleTheme,
    toggleLanguage
  }
}