<template>
  <div class="max-w-5xl mx-auto px-4 py-12 flex-grow w-full">
    <RouterLink to="/" class="text-blue-600 dark:text-blue-400 font-bold mb-6 inline-block hover:underline">
      &larr; Quay lại trang chủ
    </RouterLink>

    <div v-if="tour" class="bg-white dark:bg-slate-700 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-slate-600 p-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <span class="bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 text-xs font-bold px-3 py-1 rounded-full uppercase">
            {{ tour.subject || 'CHUYÊN ĐỀ' }} - {{ tour.target_level || tour.level || 'HỌC SINH' }}
          </span>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mt-3 mb-4">{{ tour.title }}</h1>
          <p class="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{{ tour.description || 'Chương trình trải nghiệm học tập thực tế dành cho học sinh.' }}</p>
          
          <div class="space-y-3 text-sm text-gray-700 dark:text-gray-200">
            <div><strong class="text-gray-900 dark:text-white">Địa điểm:</strong> {{ tour.location || 'Đang cập nhật' }}</div>
            <div><strong class="text-gray-900 dark:text-white">Tiêu chuẩn an toàn:</strong> {{ tour.safety_protocols || tour.safety || 'Đội ngũ hướng dẫn viên và y tế chuyên nghiệp' }}</div>
            <div><strong class="text-gray-900 dark:text-white">Giá vé / học sinh:</strong> <span class="text-red-600 dark:text-red-400 font-bold text-lg">{{ Number(tour.base_price || tour.price).toLocaleString('vi-VN') }}đ</span></div>
          </div>
        </div>

        <!-- Form Đặt Tour / Thanh Toán cho nhà trường -->
        <div class="bg-gray-50 dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-slate-600">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Đăng Ký & Đặt Tour Cho Nhà Trường</h3>
          
          <form @submit.prevent="submitBooking" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tên Trường Học</label>
              <input v-model="bookingForm.school_name" type="text" placeholder="VD: THPT Chu Văn An" class="w-full border p-2.5 rounded dark:bg-slate-700 dark:text-white" required>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Người đại diện (Giáo viên phụ trách)</label>
              <input v-model="bookingForm.contact_person" type="text" placeholder="VD: Thầy Nguyễn Văn A" class="w-full border p-2.5 rounded dark:bg-slate-700 dark:text-white" required>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Số điện thoại liên hệ</label>
              <input v-model="bookingForm.phone" type="text" placeholder="VD: 0912345678" class="w-full border p-2.5 rounded dark:bg-slate-700 dark:text-white" required>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Số lượng học sinh tham gia</label>
              <input v-model.number="bookingForm.number_of_students" type="number" min="1" placeholder="VD: 50" class="w-full border p-2.5 rounded dark:bg-slate-700 dark:text-white" required>
            </div>

            <div class="pt-2 border-t border-gray-200 dark:border-slate-700 flex justify-between items-center">
              <div>
                <span class="text-xs text-gray-500 dark:text-gray-400 block">Tạm tính tổng tiền:</span>
                <span class="text-xl font-bold text-red-600 dark:text-red-400">{{ calculatedTotal.toLocaleString('vi-VN') }}đ</span>
              </div>
              <button type="submit" class="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded font-bold shadow transition">
                Gửi Đơn & Thanh Toán
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div v-else class="text-center py-20 text-gray-500">Đang tải thông tin chương trình...</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const tourId = Number(route.params.id)

interface Tour {
  id: number
  title: string
  subject?: string
  level?: string
  target_level?: string
  price?: number | string
  base_price?: number | string
  location?: string
  safety?: string
  safety_protocols?: string
  description?: string
}

// Dữ liệu mẫu dự phòng (fallback) khớp hoàn toàn với trang chủ để không bao giờ bị trắng trang
const fallbackPrograms: Record<number, Tour> = {
  1: { id: 1, level: 'THCS', subject: 'LỊCH SỬ', title: 'Khám phá Thành Cổ Loa', description: 'Tìm hiểu kiến trúc quân sự thành cổ và truyền thống giữ nước thời Âu Lạc.', location: 'Cổ Loa, Hà Nội', safety: 'Có nhân viên y tế', price: 450000 },
  2: { id: 2, level: 'THPT', subject: 'SINH HỌC', title: 'Thực địa Sinh thái Pù Luông', description: 'Phân tích hệ sinh thái rừng nhiệt đới, khảo sát sức chứa môi trường và nhận diện các loài thực vật đặc hữu.', location: 'Khu bảo tồn thiên nhiên Pù Luông, Thanh Hóa', safety: 'Có trạm sơ cứu và kiểm lâm đi kèm', price: 850000 },
  3: { id: 3, level: 'THCS', subject: 'ĐỊA LÝ', title: 'Kiến tạo Địa chất Tràng An', description: 'Khảo sát địa hình đá vôi karst, hệ thống hang động và ý thức bảo vệ di sản thiên nhiên thế giới.', location: 'Quần thể danh thắng Tràng An, Ninh Bình', safety: '100% mặc áo phao, thuyền cứu hộ đi kèm', price: 650000 },
  4: { id: 4, level: 'THPT', subject: 'CÔNG NGHỆ', title: 'Không gian Làng lụa Vạn Phúc', description: 'Quan sát quy trình ươm tơ, dệt lụa thủ công truyền thống và trải nghiệm tương tác với nghệ nhân.', location: 'Làng lụa Vạn Phúc, Hà Nội', safety: 'Giám sát không gian xưởng dệt an toàn', price: 350000 },
  5: { id: 5, level: 'Tiểu học', subject: 'LỊCH SỬ', title: 'Truyền thống Tôn Sư Trọng Đạo', description: 'Tìm hiểu trường đại học đầu tiên của Việt Nam, nhận thức sâu sắc đạo lý hiếu học.', location: 'Văn Miếu - Quốc Tử Giám, Hà Nội', safety: 'Bảo vệ khu di tích hỗ trợ phân luồng', price: 300000 },
  6: { id: 6, level: 'THPT', subject: 'TRẢI NGHIỆM', title: 'Phát triển Kỹ năng HORECA & Sinh thái', description: 'Thực hành kỹ năng làm việc nhóm, tự phục vụ lưu trú cơ bản và tìm hiểu mạng lưới giao thông thủy.', location: 'Khu du lịch sinh thái Cần Thơ, Cần Thơ', safety: 'Huấn luyện viên kỹ năng sống giám sát', price: 1250000 }
}

const tour = ref<Tour | null>(null)

const bookingForm = ref({
  school_name: '',
  contact_person: '',
  phone: '',
  number_of_students: 1
})

const calculatedTotal = computed(() => {
  if (!tour.value) return 0
  const activePrice = Number(tour.value.base_price || tour.value.price || 0)
  return activePrice * (Number(bookingForm.value.number_of_students) || 0)
})

const fetchTourDetail = async () => {
  try {
    const response = await axios.get(`/api/tours/${tourId}`)
    tour.value = response.data
  } catch (error) {
    console.warn("Không gọi được API, sử dụng dữ liệu mẫu cục bộ:", error)
    tour.value = fallbackPrograms[tourId] || {
      id: tourId,
      title: 'Chương trình Trải nghiệm Giáo dục',
      subject: 'TRẢI NGHIỆM',
      level: 'THPT',
      price: 500000,
      location: 'Hà Nội',
      safety: 'Tiêu chuẩn an toàn chuẩn Bộ GD&ĐT',
      description: 'Chương trình tham quan và học tập thực tế.'
    }
  }
}

const submitBooking = async () => {
  const token = localStorage.getItem('auth_token')
  if (!token) {
    alert('Vui lòng đăng nhập tài khoản trước khi tiến hành đặt tour!')
    router.push('/login')
    return
  }

  if (!tour.value) return
  try {
    const payload = {
      school_name: bookingForm.value.school_name,
      contact_person: bookingForm.value.contact_person,
      phone: bookingForm.value.phone,
      tour_id: tour.value.id,
      number_of_students: bookingForm.value.number_of_students,
      total_price: calculatedTotal.value,
      status: 'Chờ thanh toán'
    }

    const response = await axios.post('/api/bookings', payload, {
      headers: {
        'Authorization': `Bearer ${token}`, // Nhét thẻ token vào đây
        'Accept': 'application/json'
      }
    })
    
    router.push(`/checkout/${response.data.data.id}`)
  } catch (error) {
    console.error("Lỗi khi gửi đơn đặt tour:", error)
    alert('Có lỗi xảy ra, vui lòng kiểm tra lại kết nối backend.')
  }
}

onMounted(() => {
  fetchTourDetail()
})
</script>