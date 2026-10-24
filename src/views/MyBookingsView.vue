<template>
  <div class="max-w-5xl mx-auto px-4 py-12 flex-grow w-full">
    <div class="text-center mb-8">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white">Tra Cứu Lịch Sử Đặt Tour Nhà Trường</h2>
      <p class="text-gray-600 dark:text-gray-300 text-sm mt-2">Nhập số điện thoại liên hệ của giáo viên/phụ trách để xem trạng thái các đơn đặt tour.</p>
    </div>

    <!-- Thanh tìm kiếm số điện thoại -->
    <div class="bg-white dark:bg-slate-700 p-6 rounded-xl shadow-md border border-gray-100 dark:border-slate-600 mb-8 flex flex-col md:flex-row gap-4 items-center justify-center">
      <input 
        v-model="searchPhone" 
        type="text" 
        placeholder="Nhập số điện thoại liên hệ (VD: 0912345678)..." 
        class="border border-gray-300 dark:border-slate-600 rounded px-4 py-2.5 w-full md:w-96 text-black dark:text-white dark:bg-slate-800 text-sm focus:outline-none focus:border-blue-500"
      >
      <button @click="searchBookings" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded font-bold text-sm shadow transition w-full md:w-auto">
        <i class="fa-solid fa-magnifying-glass mr-1"></i> Tra cứu đơn hàng
      </button>
    </div>

    <!-- Kết quả tra cứu -->
    <div v-if="hasSearched">
      <div v-if="bookings.length === 0" class="text-center py-12 bg-white dark:bg-slate-700 rounded-xl shadow-md border border-gray-100 dark:border-slate-600">
        <p class="text-gray-500 dark:text-gray-400">Không tìm thấy đơn đặt tour nào với số điện thoại: <span class="font-bold text-gray-800 dark:text-white">{{ searchPhone }}</span></p>
      </div>

      <div v-else class="bg-white dark:bg-slate-700 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-slate-600">
        <div class="overflow-x-auto">
          <table class="min-w-full text-left text-sm whitespace-nowrap">
            <thead class="uppercase tracking-wider border-b-2 border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-gray-300 font-bold">
              <tr>
                <th class="px-6 py-4">Mã đơn</th>
                <th class="px-6 py-4">Tên Trường Học</th>
                <th class="px-6 py-4">Người Đại Diện</th>
                <th class="px-6 py-4">Số lượng HS</th>
                <th class="px-6 py-4">Tổng tiền</th>
                <th class="px-6 py-4">Trạng thái thanh toán</th>
                <th class="px-6 py-4 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in bookings" :key="item.id" class="border-b border-gray-100 dark:border-slate-600 hover:bg-blue-50 dark:hover:bg-slate-600 transition">
                <td class="px-6 py-4 font-bold text-gray-900 dark:text-white">#{{ item.id }}</td>
                <td class="px-6 py-4 font-semibold text-gray-800 dark:text-white">{{ item.school_name }}</td>
                <td class="px-6 py-4 text-gray-600 dark:text-gray-300">{{ item.contact_person }} ({{ item.phone }})</td>
                <td class="px-6 py-4 text-gray-600 dark:text-gray-300">{{ item.number_of_students }} học sinh</td>
                <td class="px-6 py-4 text-red-600 dark:text-red-400 font-bold">{{ Number(item.total_price).toLocaleString('vi-VN') }}đ</td>
                <td class="px-6 py-4">
                  <span :class="item.status === 'Đã thanh toán' ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300'" class="px-3 py-1 rounded-full text-xs font-bold">
                    {{ item.status }}
                  </span>
                </td>
                <td class="px-6 py-4 text-center">
                  <RouterLink :to="`/checkout/${item.id}`" class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-xs font-bold shadow transition">
                    Xem thanh toán QR
                  </RouterLink>
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
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import axios from 'axios'

const searchPhone = ref('')
const bookings = ref<any[]>([])
const hasSearched = ref(false)

const searchBookings = async () => {
  if (!searchPhone.value.trim()) {
    alert('Vui lòng nhập số điện thoại cần tra cứu!')
    return
  }

  try {
    const response = await axios.get('/api/bookings')
    // Lọc các đơn hàng khớp với số điện thoại nhập vào
    bookings.value = response.data.filter((item: any) => item.phone.includes(searchPhone.value.trim()))
    hasSearched.value = true
  } catch (error) {
    console.error("Lỗi tra cứu đơn hàng:", error)
    alert('Không thể kết nối tới cơ sở dữ liệu backend.')
  }
}
</script>