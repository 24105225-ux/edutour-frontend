<template>
  <div class="max-w-3xl mx-auto px-4 py-12 flex-grow w-full">
    <div class="bg-white dark:bg-slate-700 rounded-xl shadow-lg p-8 border border-gray-100 dark:border-slate-600">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 rounded-full text-3xl mb-4">
          <i class="fa-solid fa-check"></i>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Đăng Ký Đặt Tour Thành Công!</h2>
        <p class="text-gray-600 dark:text-gray-300 text-sm mt-2">Mã đơn hàng của nhà trường: <span class="font-bold text-blue-600 dark:text-blue-400">#{{ order?.id || '---' }}</span></p>
      </div>

      <!-- Thông tin chi tiết đơn hàng -->
      <div class="bg-gray-50 dark:bg-slate-800 p-6 rounded-lg mb-6 space-y-3 text-sm border border-gray-200 dark:border-slate-600">
        <div class="flex justify-between">
          <span class="text-gray-500 dark:text-gray-400">Tên trường học:</span>
          <span class="font-bold text-gray-900 dark:text-white">{{ order?.school_name }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-500 dark:text-gray-400">Người đại diện:</span>
          <span class="font-bold text-gray-900 dark:text-white">{{ order?.contact_person }} (SĐT: {{ order?.phone }})</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-500 dark:text-gray-400">Số lượng học sinh:</span>
          <span class="font-bold text-gray-900 dark:text-white">{{ order?.number_of_students }} học sinh</span>
        </div>
        <div class="flex justify-between border-t pt-3 border-gray-200 dark:border-slate-700 text-base">
          <span class="font-bold text-gray-900 dark:text-white">Tổng tiền thanh toán:</span>
          <span class="font-bold text-red-600 dark:text-red-400 text-lg">{{ Number(order?.total_price || 0).toLocaleString('vi-VN') }}đ</span>
        </div>
        <div class="flex justify-between items-center pt-2">
          <span class="text-gray-500 dark:text-gray-400">Trạng thái hiện tại:</span>
          <span class="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300 px-3 py-1 rounded-full text-xs font-bold">
            {{ order?.status || 'Chờ thanh toán' }}
          </span>
        </div>
      </div>

      <!-- Hướng dẫn chuyển khoản ngân hàng cho nhà trường -->
      <div class="border border-blue-200 dark:border-slate-600 rounded-lg p-6 bg-blue-50/50 dark:bg-slate-800/50 mb-8">
        <h3 class="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <i class="fa-solid fa-qrcode text-blue-600"></i> Hướng dẫn thanh toán chuyển khoản
        </h3>
        <p class="text-xs text-gray-600 dark:text-gray-300 mb-4">Vui lòng sử dụng ứng dụng ngân hàng quét mã QR hoặc chuyển khoản theo thông tin dưới đây để hoàn tất thủ tục giữ chỗ:</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div class="space-y-2 text-gray-700 dark:text-gray-300">
            <div><strong>Ngân hàng:</strong> Techcombank (Chi nhánh Hà Nội)</div>
            <div><strong>Số tài khoản:</strong> <span class="text-blue-600 font-bold">19036888888888</span></div>
            <div><strong>Chủ tài khoản:</strong> QUY HOẠCH DU LỊCH SỐ EDUTOUR</div>
            <div><strong>Nội dung chuyển khoản:</strong> <span class="bg-white dark:bg-slate-700 px-2 py-0.5 rounded font-mono font-bold text-red-600">EDUTOUR #{{ order?.id }}</span></div>
          </div>
          <div class="flex justify-center items-center bg-white dark:bg-slate-700 p-4 rounded border">
            <!-- Mô phỏng mã QR thanh toán -->
            <div class="text-center">
              <i class="fa-solid fa-qrcode text-6xl text-gray-800 dark:text-gray-200 mb-1"></i>
              <div class="text-[10px] text-gray-500">Mã QR Thanh Toán Nhanh</div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-center space-x-4">
        <RouterLink to="/" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded font-bold shadow transition">
          Về trang chủ
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const orderId = route.params.id
const order = ref<any>(null)

const fetchOrderDetail = async () => {
  try {
    const response = await axios.get(`/api/bookings`)
    // Tìm đơn hàng vừa đặt trong danh sách
    const found = response.data.find((item: any) => item.id == orderId)
    if (found) {
      order.value = found
    } else if (response.data.length > 0) {
      order.value = response.data[0] // Lấy đơn mới nhất làm fallback
    }
  } catch (error) {
    console.error("Lỗi lấy thông tin đơn hàng:", error)
  }
}

onMounted(() => {
  fetchOrderDetail()
})
</script>