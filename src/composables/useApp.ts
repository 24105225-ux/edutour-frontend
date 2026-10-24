import { ref } from 'vue'

const isDark = ref(false)
const isEnglish = ref(false)

const dict: Record<string, string> = {
  "Đăng nhập hệ thống": "System Login",
  "Hành Trình Trải Nghiệm - Gắn Liền Mục Tiêu Giáo Dục": "Experiential Journey - Connecting Educational Goals",
  "Nền tảng kết nối Nhà trường, Phụ huynh và Đơn vị tổ chức. Đảm bảo an toàn, minh bạch hồ sơ y tế và bám sát khung chương trình GDPT.": "Platform connecting Schools, Parents, and Organizers. Ensuring safety, medical records compliance, and adherence to the GDPT curriculum.",
  "TRƯỜNG HỌC": "SCHOOLS", "HỌC SINH": "STUDENTS", "CHƯƠNG TRÌNH": "PROGRAMS",
  "Danh Mục Chương Trình Tiêu Biểu": "Featured Programs Catalog",
  "Ánh xạ trực tiếp từ yêu cầu cần đạt của Bộ GD&ĐT.": "Directly mapped from the requirements of the Ministry of Education and Training.",
  "Tìm tên tour, điểm đến...": "Search tour name, destination...",
  "Xem chi tiết": "View details", "LỊCH SỬ": "HISTORY", "SINH HỌC": "BIOLOGY", "ĐỊA LÝ": "GEOGRAPHY", "CÔNG NGHỆ": "TECHNOLOGY", "TRẢI NGHIỆM": "EXPERIENCE",
  "Khám phá Thành Cổ Loa": "Explore Co Loa Citadel",
  "Tìm hiểu kiến trúc quân sự thành cổ và truyền thống giữ nước thời Âu Lạc.": "Learn about ancient citadel military architecture and the tradition of defending the country.",
  "Cổ Loa, Hà Nội": "Co Loa, Hanoi", "Có nhân viên y tế": "Medical staff available",
  "Thực địa Sinh thái Pù Luông": "Pu Luong Ecological Fieldtrip",
  "Phân tích hệ sinh thái rừng nhiệt đới, khảo sát sức chứa môi trường và nhận diện các loài thực vật đặc hữu.": "Analyze tropical forest ecosystems, survey environmental carrying capacity, and identify endemic plant species.",
  "Khu bảo tồn thiên nhiên Pù Luông, Thanh Hóa": "Pu Luong Nature Reserve, Thanh Hoa",
  "Có trạm sơ cứu và kiểm lâm đi kèm": "First aid station and rangers included",
  "Kiến tạo Địa chất Tràng An": "Trang An Geological Formation",
  "Khảo sát địa hình đá vôi karst, hệ thống hang động và ý thức bảo vệ di sản thiên nhiên thế giới.": "Survey karst limestone topography, cave systems, and world heritage conservation awareness.",
  "Quần thể danh thắng Tràng An, Ninh Bình": "Trang An Scenic Landscape Complex, Ninh Binh",
  "100% mặc áo phao, thuyền cứu hộ đi kèm": "100% life jackets worn, rescue boats included",
  "Không gian Làng lụa Vạn Phúc": "Van Phuc Silk Village Space",
  "Quan sát quy trình ươm tơ, dệt lụa thủ công truyền thống và trải nghiệm tương tác với nghệ nhân.": "Observe the traditional manual silk weaving process and interact with artisans.",
  "Làng lụa Vạn Phúc, Hà Nội": "Van Phuc Silk Village, Hanoi",
  "Giám sát không gian xưởng dệt an toàn": "Safe weaving workshop space supervision",
  "Truyền thống Tôn Sư Trọng Đạo": "Tradition of Respecting Teachers",
  "Tìm hiểu trường đại học đầu tiên của Việt Nam, nhận thức sâu sắc đạo lý hiếu học.": "Learn about Vietnam's first university, gaining a deep understanding of the philosophy of learning.",
  "Văn Miếu - Quốc Tử Giám, Hà Nội": "Temple of Literature, Hanoi",
  "Bảo vệ khu di tích hỗ trợ phân luồng": "Relic site security assisting with traffic flow",
  "Phát triển Kỹ năng HORECA & Sinh thái": "HORECA & Ecological Skills Development",
  "Thực hành kỹ năng làm việc nhóm, tự phục vụ lưu trú cơ bản và tìm hiểu mạng lưới giao thông thủy.": "Practice teamwork skills, basic self-service accommodation, and learn about the waterway transport network.",
  "Khu du lịch sinh thái Cần Thơ, Cần Thơ": "Can Tho Ecotourism Area, Can Tho",
  "Huấn luyện viên kỹ năng sống giám sát": "Life skills coach supervision"
}

export function useApp() {
  const t = (text: string) => {
    if (!isEnglish.value) return text;
    return dict[text] || text;
  }
  const toggleLanguage = () => { isEnglish.value = !isEnglish.value; }
  const toggleTheme = () => {
    isDark.value = !isDark.value;
    if (isDark.value) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }
  const initTheme = () => {
    if (localStorage.getItem('theme') === 'dark') {
      isDark.value = true;
      document.documentElement.classList.add('dark');
    }
  }
  return { isDark, isEnglish, t, toggleLanguage, toggleTheme, initTheme }
}