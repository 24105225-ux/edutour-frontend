<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow w-full">
    <div class="flex justify-between items-center mb-8">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white">Quản Lý Đơn Đặt Tour & Thanh Toán Nhà Trường</h2>
      <button @click="fetchBookings" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow font-bold transition">
        <i class="fa-solid fa-rotate-right mr-1"></i> Làm mới dữ liệu
      </button>
    </div>

    <!-- Bảng danh sách đơn hàng -->
    <div class="bg-white dark:bg-slate-700 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-slate-600">
      <div class="overflow-x-auto">
        <table class="min-w-full text-left text-sm whitespace-nowrap">
          <thead class="uppercase tracking-wider border-b-2 border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-gray-300 font-bold">
            <tr>
              <th scope="col" class="px-6 py-4">Mã đơn</th>
              <th scope="col" class="px-6 py-4">Trường học / Liên hệ</th>
              <th scope="col" class="px-6 py-4">Chương trình Tour</th>
              <th scope="col" class="px-6 py-4">Số lượng HS</th>
              <th scope="col" class="px-6 py-4">Tổng tiền thanh toán</th>
              <th scope="col" class="px-6 py-4">Trạng thái</th>
              <th scope="col" class="px-6 py-4 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="bookings.length === 0">
              <td colspan="7" class="px-6 py-8 text-center text-gray-500 dark:text-gray-400">Chưa có đơn đặt tour nào từ nhà trường.</td>
            </tr>
            <tr v-for="item in bookings" :key="item.id" class="border-b border-gray-100 dark:border-slate-600 hover:bg-blue-50 dark:hover:bg-slate-600 transition">
              <th scope="row" class="px-6 py-4 font-bold text-gray-900 dark:text-white">#{{ item.id }}</th>
              <td class="px-6 py-4">
                <div class="font-bold text-gray-900 dark:text-white">{{ item.school_name }}</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">{{ item.contact_person }} - SĐT: {{ item.phone }}</div>
              </td>
              <td class="px-6 py-4 text-gray-700 dark:text-gray-200 font-semibold">
                {{ item.tour ? item.tour.title : 'Tour ID: ' + item.tour_id }}
              </td>
              <td class="px-6 py-4 text-gray-600 dark:text-gray-300 font-medium">{{ item.number_of_students }} học sinh</td>
              <td class="px-6 py-4 text-red-600 dark:text-red-400 font-bold text-base">{{ Number(item.total_price).toLocaleString('vi-VN') }}đ</td>
              <td class="px-6 py-4">
                <span :class="item.status === 'Đã thanh toán' ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300'" class="px-3 py-1 rounded-full text-xs font-bold">
                  {{ item.status }}
                </span>
              </td>
              <td class="px-6 py-4 text-center space-x-2">
                <button v-if="item.status !== 'Đã thanh toán'" @click="markAsPaid(item.id)" class="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs font-bold shadow">
                  Xác nhận Đã thanh toán
                </button>
                <button @click="deleteBooking(item.id)" class="text-red-500 hover:text-red-700 font-bold px-3 py-1 rounded bg-red-100 dark:bg-red-900/30 text-xs">
                  Xóa
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

const bookings = ref([])
const API_URL = '/api/bookings'

// Lấy danh sách đơn hàng
const fetchBookings = async () => {
  try {
    const response = await axios.get(API_URL)
    bookings.value = response.data
  } catch (error) {
    console.error("Lỗi tải danh sách đơn hàng:", error)
  }
}

// Xác nhận đã thanh toán
const markAsPaid = async (id: number) => {
  try {
    await axios.put(`${API_URL}/${id}`, { status: 'Đã thanh toán' })
    alert('Đã cập nhật trạng thái thanh toán thành công!')
    fetchBookings()
  } catch (error) {
    console.error("Lỗi cập nhật trạng thái:", error)
  }
}

// Xóa đơn đặt tour
const deleteBooking = async (id: number) => {
  if (confirm('Bạn có chắc chắn muốn xóa đơn đặt tour này không?')) {
    try {
      await axios.delete(`${API_URL}/${id}`)
      fetchBookings()
    } catch (error) {
      console.error("Lỗi khi xóa:", error)
    }
  }
}

import { useRouter } from 'vue-router'
const router = useRouter()

onMounted(() => {
  // Chặn cửa: Bắt buộc phải đăng nhập tài khoản Admin mới được vào trang duyệt thanh toán này
  const token = localStorage.getItem('auth_token')
  if (!token) {
    alert('Bạn cần đăng nhập tài khoản quản trị để truy cập trang duyệt đơn hàng!')
    router.push('/login')
    return
  }
  fetchBookings()
})
</script>