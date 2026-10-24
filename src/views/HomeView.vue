<template>
  <div class="flex flex-col min-h-screen">
    <!-- Banner Giới thiệu chính -->
    <div class="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 text-center shadow-inner relative overflow-hidden">
      <div class="absolute inset-0 bg-black opacity-10"></div>
      <div class="max-w-4xl mx-auto px-4 relative z-10">
        <span class="bg-blue-500/50 text-blue-100 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">
          Nền tảng chuẩn hóa du lịch học đường
        </span>
        <h1 class="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">{{ t('Hành Trình Trải Nghiệm - Gắn Liền Mục Tiêu Giáo Dục') }}</h1>
        <p class="text-lg text-blue-100 max-w-2xl mx-auto mb-8">{{ t('Nền tảng kết nối Nhà trường, Phụ huynh và Đơn vị tổ chức. Đảm bảo an toàn, minh bạch hồ sơ y tế và bám sát khung chương trình GDPT.') }}</p>
        
        <!-- Thống kê động -->
        <div class="flex justify-center gap-6 flex-wrap">
          <div class="bg-white/10 backdrop-blur-md p-4 rounded-xl text-center w-36 border border-white/20 shadow-lg">
            <div class="text-3xl font-extrabold text-yellow-300">{{ stats.schools }}</div>
            <div class="text-xs text-blue-200 uppercase font-bold mt-1">{{ t('TRƯỜNG HỌC') }}</div>
          </div>
          <div class="bg-white/10 backdrop-blur-md p-4 rounded-xl text-center w-36 border border-white/20 shadow-lg">
            <div class="text-3xl font-extrabold text-green-300">{{ stats.students }}</div>
            <div class="text-xs text-blue-200 uppercase font-bold mt-1">{{ t('HỌC SINH') }}</div>
          </div>
          <div class="bg-white/10 backdrop-blur-md p-4 rounded-xl text-center w-36 border border-white/20 shadow-lg">
            <div class="text-3xl font-extrabold text-orange-300">{{ stats.tours }}</div>
            <div class="text-xs text-blue-200 uppercase font-bold mt-1">{{ t('CHƯƠNG TRÌNH') }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- KHỐI 1: THANH PHÂN LOẠI NHANH THEO CHỦ ĐỀ -->
    <div class="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 py-6 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p class="text-xs font-bold text-gray-400 dark:text-gray-400 uppercase tracking-wider mb-3 text-center sm:text-left">Khám phá theo lĩnh vực môn học:</p>
        <div class="flex flex-wrap justify-center sm:justify-start gap-3">
          <button @click="selectedSubject = ''" :class="selectedSubject === '' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200'" class="px-4 py-2 rounded-full text-xs font-bold transition flex items-center gap-2">
            <i class="fa-solid fa-border-all"></i> Tất cả lĩnh vực
          </button>
          <button @click="selectedSubject = 'LỊCH SỬ'" :class="selectedSubject === 'LỊCH SỬ' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200'" class="px-4 py-2 rounded-full text-xs font-bold transition flex items-center gap-2">
            <i class="fa-solid fa-landmark text-amber-500"></i> Lịch sử - Văn hóa
          </button>
          <button @click="selectedSubject = 'SINH HỌC'" :class="selectedSubject === 'SINH HỌC' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200'" class="px-4 py-2 rounded-full text-xs font-bold transition flex items-center gap-2">
            <i class="fa-solid fa-leaf text-green-500"></i> Sinh học - Môi trường
          </button>
          <button @click="selectedSubject = 'ĐỊA LÝ'" :class="selectedSubject === 'ĐỊA LÝ' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200'" class="px-4 py-2 rounded-full text-xs font-bold transition flex items-center gap-2">
            <i class="fa-solid fa-mountain text-blue-500"></i> Địa lý - Địa chất
          </button>
          <button @click="selectedSubject = 'CÔNG NGHỆ'" :class="selectedSubject === 'CÔNG NGHỆ' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200'" class="px-4 py-2 rounded-full text-xs font-bold transition flex items-center gap-2">
            <i class="fa-solid fa-microchip text-indigo-500"></i> Khoa học - Công nghệ
          </button>
        </div>
      </div>
    </div>

    <!-- MAIN CONTENT: BỘ LỌC & DANH MỤC TOUR -->
    <main class="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <div class="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-white dark:bg-slate-700 p-6 rounded-xl shadow-md border border-gray-100 dark:border-slate-600">
        <div>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">{{ t('Danh Mục Chương Trình Tiêu Biểu') }}</h2>
          <p class="text-gray-600 dark:text-gray-300 text-sm mt-1">{{ t('Ánh xạ trực tiếp từ yêu cầu cần đạt của Bộ GD&ĐT.') }}</p>
        </div>
        <div class="flex flex-wrap gap-3 w-full md:w-auto">
          <input v-model="searchQuery" type="text" :placeholder="t('Tìm tên tour, điểm đến...')" class="border border-gray-300 dark:border-slate-600 rounded px-4 py-2 focus:outline-none focus:border-blue-500 text-black dark:text-white dark:bg-slate-800 text-sm flex-grow md:w-64">
          <select v-model="selectedLevel" class="border border-gray-300 dark:border-slate-600 rounded px-3 py-2 text-sm bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200">
            <option value="">Tất cả cấp học</option>
            <option value="Tiểu học">Tiểu học</option>
            <option value="THCS">THCS</option>
            <option value="THPT">THPT</option>
          </select>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="prog in filteredPrograms" :key="prog.id" class="bg-white dark:bg-slate-700 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-slate-600 hover:shadow-xl transition flex flex-col group">
          <div class="h-44 w-full bg-cover bg-center relative overflow-hidden" :style="{ backgroundImage: `url(${prog.image})` }">
            <div class="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition"></div>
            <span class="absolute top-3 right-3 bg-yellow-400 text-yellow-900 text-xs font-extrabold px-2.5 py-1 rounded-md shadow-md z-10">Cấp: {{ prog.level }}</span>
          </div>
          <div class="p-5 flex-grow">
            <div class="text-xs text-blue-600 dark:text-blue-400 font-bold uppercase mb-1"><span>{{ t(prog.subject) }}</span></div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2 truncate"><span>{{ t(prog.title) }}</span></h3>
            <p class="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2"><span>{{ t(prog.desc) }}</span></p>
            <div class="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
              <i class="fa-solid fa-location-dot w-5 text-red-500"></i> <span>{{ t(prog.location) }}</span>
            </div>
            <div class="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
              <i class="fa-solid fa-shield-halved w-5 text-green-600 dark:text-green-400"></i> <span class="truncate">{{ t(prog.safety) }}</span>
            </div>
          </div>
          <div class="p-5 pt-0 mt-auto border-t border-gray-100 dark:border-slate-600 pt-4 flex justify-between items-center">
            <span class="text-lg font-bold text-red-600 dark:text-red-400">{{ prog.price }}đ</span>
            <RouterLink :to="'/tour/' + prog.id" class="bg-blue-50 dark:bg-slate-600 hover:bg-blue-100 dark:hover:bg-slate-500 text-blue-700 dark:text-blue-300 px-4 py-2 rounded text-sm font-semibold transition inline-flex items-center">
              <span>{{ t('Xem chi tiết') }}</span> <i class="fa-solid fa-arrow-right ml-1"></i>
            </RouterLink>
          </div>
        </div>
      </div>
    </main>

    <!-- KHỐI 2: KHOẢNH KHẮC TRẢI NGHIỆM THỰC TẾ (CHỦ ĐỘNG TỰ LƯỚT 3 ẢNH) -->
    <section class="bg-gray-100 dark:bg-slate-900 py-16 border-t border-gray-200 dark:border-slate-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
          <div>
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white">Khoảnh Khắc Trải Nghiệm Thực Tế</h2>
            <p class="text-gray-600 dark:text-gray-400 text-sm mt-1">Bấm nút điều hướng để xem các góc máy ghi lại hành trình thực địa.</p>
          </div>
          <!-- Nút bấm lướt thủ công -->
          <div class="flex gap-2">
            <button @click="prevGallerySlide" class="bg-white dark:bg-slate-800 hover:bg-blue-600 hover:text-white text-gray-700 dark:text-gray-200 px-4 py-2 rounded-xl shadow border border-gray-200 dark:border-slate-700 flex items-center gap-2 text-sm font-bold transition">
              <i class="fa-solid fa-arrow-left"></i> Trước
            </button>
            <button @click="nextGallerySlide" class="bg-white dark:bg-slate-800 hover:bg-blue-600 hover:text-white text-gray-700 dark:text-gray-200 px-4 py-2 rounded-xl shadow border border-gray-200 dark:border-slate-700 flex items-center gap-2 text-sm font-bold transition">
              Sau <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>

        <!-- Lưới hiển thị 3 ảnh trượt thủ công -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="(slide, idx) in visibleGallerySlides" :key="idx" class="overflow-hidden rounded-2xl shadow-lg h-64 relative group bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 transition-all duration-300">
            <img :src="slide.image" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
              <div>
                <span class="bg-blue-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase mb-2 inline-block">{{ slide.tag }}</span>
                <h3 class="text-white text-lg font-bold leading-snug">{{ slide.title }}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- KHỐI 3: ĐÁNH GIÁ TỪ NHÀ TRƯỜNG (DẠNG GRID 3 CỘT CHUYÊN NGHIỆP, KHÔNG DÙNG SLIDE ĐƠN THÔ SƠ) -->
    <section class="py-16 bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white">Đánh Giá Từ Ban Giám Hiệu & Giáo Viên</h2>
          <p class="text-gray-600 dark:text-gray-400 text-sm mt-2">Sự tín nhiệm của các nhà trường là minh chứng rõ nét nhất cho chất lượng dịch vụ.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="(item, index) in testimonials" :key="index" class="bg-blue-50/50 dark:bg-slate-700/50 p-8 rounded-3xl border border-blue-100 dark:border-slate-600 shadow-sm relative flex flex-col justify-between hover:shadow-md transition">
            <i class="fa-solid fa-quote-left text-3xl text-blue-300 dark:text-blue-500 mb-4 block opacity-60"></i>
            <p class="text-gray-700 dark:text-gray-300 text-sm mb-6 italic leading-relaxed">“{{ item.quote }}”</p>
            <div class="flex items-center gap-3 pt-4 border-t border-blue-100/60 dark:border-slate-600">
              <div class="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0">{{ item.initial }}</div>
              <div>
                <h4 class="font-bold text-gray-900 dark:text-white text-sm">{{ item.author }}</h4>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{{ item.role }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useApp } from '../composables/useApp'
import axios from 'axios'

const { t } = useApp()

const stats = ref({ schools: 5, students: 100, tours: 10 })
const searchQuery = ref('')
const selectedLevel = ref('')
const selectedSubject = ref('')

// Danh sách tours được lấy động từ Database Backend (thay vì mảng tĩnh cứng)
const programs = ref<any[]>([])

const fetchHomeTours = async () => {
  try {
    const response = await axios.get('/api/tours')
    const rawData = response.data.data || response.data
    
    // Mảng danh sách các ảnh đẹp thực tế tương ứng với các chủ đề du lịch học đường
    const sampleImages = [
      'https://upload.wikimedia.org/wikipedia/commons/6/62/An_Duong_Vuong_Temple_Gate_Co_Loa.jpg', // Cổ Loa
      'https://images.vietnamtourism.gov.vn/vn//images/2023/thang12/0512.pu_luong.jpg', // Pù Luông
      'https://bizweb.dktcdn.net/100/006/093/files/thien-ha-2-57d166a1-e72c-4466-9f65-6364e2cf15ea.jpg', // Tràng An
      'https://langngheviet.com.vn/stores/news_dataimages/langnghevietcomvn/042021/26/09/lang-lua-van-phuc-31-.6337.jpg', // Vạn Phúc
      'https://statics.vinpearl.com/van-mieu-mon-van-mieu-quoc-tu-giam_1752765402.jpg', // Văn Miếu
      'https://www.vietnambooking.com/wp-content/uploads/2017/08/du-lich-can-tho-30-8-2017-sinh-thai.jpg' // Cần Thơ
    ]

    programs.value = rawData.map((item: any, index: number) => {
      // Tự động phân bổ ảnh xoay vòng theo ID hoặc index để các tour khác nhau có ảnh khác nhau
      const assignedImage = sampleImages[item.id % sampleImages.length] || sampleImages[index % sampleImages.length]

      return {
        id: item.id,
        level: item.target_level,
        subject: item.category_id == 1 ? 'LỊCH SỬ' : (item.category_id == 2 ? 'SINH HỌC' : (item.category_id == 3 ? 'ĐỊA LÝ' : 'CÔNG NGHỆ')),
        title: item.title,
        desc: item.safety_protocols || 'Chương trình trải nghiệm thực tế giáo dục học đường.',
        location: 'Hà Nội & Các tỉnh lân cận',
        safety: item.safety_protocols || 'Y tế đi kèm, 100% bảo hiểm',
        price: Number(item.base_price).toLocaleString('vi-VN'),
        image: assignedImage // Lấy ảnh phân bổ động
      }
    })
    
    stats.value.tours = programs.value.length
  } catch (error) {
    console.error("Lỗi tải danh sách tour trang chủ:", error)
  }
}

const filteredPrograms = computed(() => {
  return programs.value.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          item.location.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          item.subject.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesLevel = selectedLevel.value === '' || item.level === selectedLevel.value
    const matchesSubject = selectedSubject.value === '' || item.subject === selectedSubject.value
    return matchesSearch && matchesLevel && matchesSubject
  })
})

// Dữ liệu Thư viện ảnh
const galleryIndex = ref(0)
const gallerySlides = [
  { image: 'https://upload.wikimedia.org/wikipedia/commons/6/62/An_Duong_Vuong_Temple_Gate_Co_Loa.jpg', title: 'Khám phá kiến trúc quân sự Cổ Loa', tag: 'Lịch sử' },
  { image: 'https://images.vietnamtourism.gov.vn/vn//images/2023/thang12/0512.pu_luong.jpg', title: 'Thực địa sinh thái rừng nhiệt đới Pù Luông', tag: 'Sinh học' },
  { image: 'https://bizweb.dktcdn.net/100/006/093/files/thien-ha-2-57d166a1-e72c-4466-9f65-6364e2cf15ea.jpg', title: 'Khảo sát hệ thống hang động Tràng An', tag: 'Địa lý' },
  { image: 'https://statics.vinpearl.com/van-mieu-mon-van-mieu-quoc-tu-giam_1752765402.jpg', title: 'Tìm hiểu đạo lý hiếu học tại Văn Miếu', tag: 'Văn hóa' },
  { image: 'https://langngheviet.com.vn/stores/news_dataimages/langnghevietcomvn/042021/26/09/lang-lua-van-phuc-31-.6337.jpg', title: 'Trải nghiệm quy trình dệt lụa Vạn Phúc', tag: 'Công nghệ' }
]

const visibleGallerySlides = computed(() => {
  const result = []
  for (let i = 0; i < 3; i++) {
    const index = (galleryIndex.value + i) % gallerySlides.length
    result.push(gallerySlides[index])
  }
  return result
})

const nextGallerySlide = () => { galleryIndex.value = (galleryIndex.value + 1) % gallerySlides.length }
const prevGallerySlide = () => { galleryIndex.value = (galleryIndex.value - 1 + gallerySlides.length) % gallerySlides.length }

// Dữ liệu Đánh giá từ nhà trường
const testimonials = [
  { quote: 'Chương trình thực địa tại Pù Luông được tổ chức cực kỳ khoa học, an toàn và bám sát kiến thức Sinh học lớp 10. Học sinh rất hào hứng.', author: 'Thầy Nguyễn Văn Hùng', role: 'Hiệu phó Trường THPT Chu Văn An', initial: 'TH' },
  { quote: 'Hệ thống duyệt đơn và minh bạch hồ sơ y tế giúp nhà trường hoàn toàn yên tâm khi phụ trách đoàn hàng trăm học sinh đi tham quan.', author: 'Cô Đoàn Thị Lan', role: 'Trưởng ban Hoạt động Trải nghiệm THCS Cầu Giấy', initial: 'ĐL' },
  { quote: 'Quy trình đặt tour và thanh toán cực kỳ tinh gọn. Giao diện trực quan, hỗ trợ tra cứu lịch sử đơn hàng rất tiện lợi cho giáo viên.', author: 'Thầy Trần Minh Đức', role: 'Giáo viên chủ nhiệm Khối 12 THPT Phan Đình Phùng', initial: 'TM' }
]

onMounted(() => {
  fetchHomeTours()
})
</script>