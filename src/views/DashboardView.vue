<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow w-full">
    <!-- Header Dashboard -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
      <div>
        <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Hệ Thống Quản Trị (Admin Dashboard)</h2>
        <p class="text-gray-500 dark:text-gray-400 text-sm mt-1">Xin chào Quản trị viên, quản lý toàn bộ hệ thống tour và đơn đặt hàng trường học tại đây.</p>
      </div>
      <button @click="handleLogout" class="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl shadow-md font-bold transition flex items-center gap-2">
        <i class="fa-solid fa-right-from-bracket"></i> Đăng xuất
      </button>
    </div>

    <!-- KHỐI THỐNG KÊ TỔNG QUAN (Xóa khoảng trống, tạo điểm nhấn) -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Tổng số chương trình tour</p>
          <h3 class="text-3xl font-bold text-gray-900 dark:text-white mt-1">{{ tours.length }}</h3>
        </div>
        <div class="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xl font-bold">
          <i class="fa-solid fa-map-location-dot"></i>
        </div>
      </div>

      <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Tổng đơn đặt tour</p>
          <h3 class="text-3xl font-bold text-gray-900 dark:text-white mt-1">{{ bookings.length }}</h3>
        </div>
        <div class="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xl font-bold">
          <i class="fa-solid fa-file-invoice-dollar"></i>
        </div>
      </div>

      <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Tổng doanh thu dự kiến</p>
          <h3 class="text-2xl font-bold text-red-600 mt-1">{{ totalRevenue.toLocaleString('vi-VN') }}đ</h3>
        </div>
        <div class="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-900/40 text-red-600 dark:text-red-400 flex items-center justify-center text-xl font-bold">
          <i class="fa-solid fa-sack-dollar"></i>
        </div>
      </div>
    </div>

    <!-- Thanh chuyển đổi Tab quản lý -->
    <div class="flex space-x-4 mb-6 border-b border-gray-200 dark:border-slate-700 pb-3">
      <button @click="currentTab = 'tours'" :class="currentTab === 'tours' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'" class="px-5 py-2.5 rounded-xl font-bold transition flex items-center gap-2">
        <i class="fa-solid fa-map-location-dot"></i> Quản Lý Tour (CRUD)
      </button>
      <button @click="currentTab = 'bookings'" :class="currentTab === 'bookings' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'" class="px-5 py-2.5 rounded-xl font-bold transition flex items-center gap-2">
        <i class="fa-solid fa-file-invoice-dollar"></i> Quản Lý Đơn Đặt Tour & Duyệt Thanh Toán
      </button>
    </div>

    <!-- TAB 1: QUẢN LÝ TOUR -->
    <div v-if="currentTab === 'tours'">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-xl font-bold text-gray-900 dark:text-white">Danh sách chương trình tour</h3>
        <button @click="showAddForm = !showAddForm" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl shadow font-bold transition flex items-center gap-2">
          <i :class="showAddForm ? 'fa-solid fa-xmark' : 'fa-solid fa-plus'"></i>
          {{ showAddForm ? 'Đóng form' : 'Thêm Tour Mới' }}
        </button>
      </div>

      <!-- Form Thêm Tour -->
      <div v-if="showAddForm" class="mb-8 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-slate-700">
        <h4 class="text-lg font-bold text-gray-800 dark:text-white mb-4">Thêm chương trình tour mới</h4>
        <form @submit.prevent="submitTour" class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tên tour</label>
            <input v-model="tourForm.title" type="text" required class="w-full px-3 py-2 border rounded-xl dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Slug / Đường dẫn</label>
            <input v-model="tourForm.slug" type="text" required class="w-full px-3 py-2 border rounded-xl dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Cấp học (target_level)</label>
            <input v-model="tourForm.target_level" type="text" placeholder="THCS, THPT, Tiểu học..." required class="w-full px-3 py-2 border rounded-xl dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Giá cơ bản (VNĐ)</label>
            <input v-model="tourForm.base_price" type="number" required class="w-full px-3 py-2 border rounded-xl dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <div class="md:col-span-2 pt-2">
            <button type="submit" class="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-xl font-bold shadow transition">
              Lưu Tour Mới
            </button>
          </div>
        </form>
      </div>

      <!-- Bảng danh sách Tour -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm overflow-hidden border border-gray-100 dark:border-slate-700">
        <div class="overflow-x-auto">
          <table class="min-w-full text-left text-sm whitespace-nowrap">
            <thead class="uppercase tracking-wider border-b border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/50 text-gray-500 dark:text-gray-400 font-bold text-xs">
              <tr>
                <th class="px-6 py-4">ID</th>
                <th class="px-6 py-4">Tên Tour</th>
                <th class="px-6 py-4">Cấp học</th>
                <th class="px-6 py-4">Giá cơ bản</th>
                <th class="px-6 py-4 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 dark:divide-slate-700">
              <tr v-if="tours.length === 0">
                <td colspan="5" class="px-6 py-10 text-center text-gray-400">Chưa có chương trình tour nào.</td>
              </tr>
              <tr v-for="tour in tours" :key="tour.id" class="hover:bg-gray-50/80 dark:hover:bg-slate-700/50 transition">
                <td class="px-6 py-4 font-bold text-gray-900 dark:text-white">#{{ tour.id }}</td>
                <td class="px-6 py-4 font-semibold text-gray-800 dark:text-white">{{ tour.title }}</td>
                <td class="px-6 py-4">
                  <span class="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-bold">{{ tour.target_level }}</span>
                </td>
                <td class="px-6 py-4 font-bold text-emerald-600">{{ Number(tour.base_price).toLocaleString('vi-VN') }}đ</td>
                <td class="px-6 py-4 text-center">
                  <button @click="deleteTour(tour.id)" class="bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 rounded-xl text-xs font-bold transition">
                    <i class="fa-solid fa-trash-can mr-1"></i> Xóa
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- TAB 2: QUẢN LÝ ĐƠN ĐẶT TOUR -->
    <div v-if="currentTab === 'bookings'">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-xl font-bold text-gray-900 dark:text-white">Danh sách đơn đặt tour từ các trường học</h3>
        <button @click="fetchBookings" class="bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-xl text-sm font-bold transition flex items-center gap-1.5">
          <i class="fa-solid fa-rotate-right"></i> Làm mới
        </button>
      </div>

      <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm overflow-hidden border border-gray-100 dark:border-slate-700">
        <div class="overflow-x-auto">
          <table class="min-w-full text-left text-sm whitespace-nowrap">
            <thead class="uppercase tracking-wider border-b border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/50 text-gray-500 dark:text-gray-400 font-bold text-xs">
              <tr>
                <th class="px-6 py-4">Mã đơn</th>
                <th class="px-6 py-4">Thông tin khách / Ngày</th>
                <th class="px-6 py-4">Tour đăng ký</th>
                <th class="px-6 py-4">Số lượng HS</th>
                <th class="px-6 py-4">Tổng tiền</th>
                <th class="px-6 py-4">Trạng thái</th>
                <th class="px-6 py-4 text-center">Hành động của Admin</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 dark:divide-slate-700">
              <tr v-if="bookings.length === 0">
                <td colspan="7" class="px-6 py-10 text-center text-gray-400">Chưa có đơn đặt tour nào.</td>
              </tr>
              <tr v-for="item in bookings" :key="item.id" class="hover:bg-gray-50/80 dark:hover:bg-slate-700/50 transition">
                <td class="px-6 py-4 font-bold text-gray-900 dark:text-white">#{{ item.id }} <span class="text-xs font-normal text-gray-400">({{ item.code }})</span></td>
                <td class="px-6 py-4">
                  <div class="font-semibold text-gray-800 dark:text-white">User ID: {{ item.user_id }}</div>
                  <div class="text-xs text-gray-500">Ngày đi: {{ item.service_date }}</div>
                </td>
                <td class="px-6 py-4 font-medium text-gray-700 dark:text-gray-200">
                  {{ item.tour ? item.tour.title : 'Tour ID: ' + item.tour_id }}
                </td>
                <td class="px-6 py-4 font-semibold">{{ item.pax }} học sinh</td>
                <td class="px-6 py-4 font-bold text-red-600">{{ Number(item.total_amount).toLocaleString('vi-VN') }}đ</td>
                <td class="px-6 py-4">
                  <span :class="item.status === 'confirmed' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'" class="px-3 py-1 rounded-full text-xs font-bold">
                    {{ item.status === 'confirmed' ? 'Đã xác nhận' : item.status }}
                  </span>
                </td>
                <td class="px-6 py-4 text-center space-x-2">
                  <button v-if="item.status !== 'confirmed'" @click="markAsPaid(item.id)" class="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm transition">
                    Duyệt đơn
                  </button>
                  <button @click="deleteBooking(item.id)" class="bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 rounded-xl text-xs font-bold transition">
                    Xóa
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const currentTab = ref('tours')
const showAddForm = ref(false)

const tours = ref<any[]>([])
const bookings = ref<any[]>([])

const tourForm = ref({
  title: '',
  slug: '',
  target_level: '',
  base_price: 0,
  category_id: 1
})

// Tính tổng doanh thu từ danh sách bookings
const totalRevenue = computed(() => {
  return bookings.value.reduce((sum, item) => sum + Number(item.total_amount || 0), 0)
})

const fetchTours = async () => {
  try {
    const response = await axios.get('/api/tours')
    tours.value = response.data.data || response.data
  } catch (error) {
    console.error("Lỗi tải danh sách tour:", error)
  }
}

const submitTour = async () => {
  try {
    const token = localStorage.getItem('auth_token')
    await axios.post('/api/tours', tourForm.value, {
      headers: { Authorization: `Bearer ${token}` }
    })
    alert('Thêm tour thành công!')
    showAddForm.value = false
    tourForm.value = { title: '', slug: '', target_level: '', base_price: 0, category_id: 1 }
    fetchTours()
  } catch (error) {
    alert('Thêm tour thất bại!')
  }
}

const deleteTour = async (id: number) => {
  if (confirm('Bạn có chắc muốn xóa tour này?')) {
    try {
      const token = localStorage.getItem('auth_token')
      await axios.delete(`/api/tours/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchTours()
    } catch (error) {
      alert('Không thể xóa tour!')
    }
  }
}

const fetchBookings = async () => {
  try {
    const token = localStorage.getItem('auth_token')
    const response = await axios.get('/api/bookings', {
      headers: { Authorization: `Bearer ${token}` }
    })
    const resData = response.data.data
    bookings.value = Array.isArray(resData) ? resData : (resData.data || [])
  } catch (error) {
    console.error("Lỗi tải danh sách đơn booking:", error)
  }
}

const markAsPaid = async (id: number) => {
  try {
    const token = localStorage.getItem('auth_token')
    await axios.put(`/api/bookings/${id}`, { status: 'confirmed' }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    alert('Đã duyệt đơn thành công!')
    fetchBookings()
  } catch (error) {
    alert('Lỗi duyệt đơn!')
  }
}

const deleteBooking = async (id: number) => {
  if (confirm('Bạn có chắc muốn xóa đơn này không?')) {
    try {
      const token = localStorage.getItem('auth_token')
      await axios.delete(`/api/bookings/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchBookings()
    } catch (error) {
      alert('Không thể xóa đơn hàng!')
    }
  }
}

const handleLogout = () => {
  localStorage.removeItem('auth_token')
  localStorage.removeItem('user_info')
  router.push('/login')
}

onMounted(() => {
  const token = localStorage.getItem('auth_token')
  if (!token) {
    alert('Bạn cần đăng nhập tài khoản quản trị!')
    router.push('/login')
    return
  }
  fetchTours()
  fetchBookings()
})
</script>