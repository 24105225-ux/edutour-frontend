<template>
  <div class="max-w-3xl mx-auto px-4 py-12 flex-grow w-full">
    <div class="bg-white dark:bg-slate-700 rounded-xl shadow-lg p-8 border border-gray-100 dark:border-slate-600">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 rounded-full text-3xl mb-4">
          <i class="fa-solid fa-check"></i>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Đăng Ký Đặt Tour Thành Công!</h2>
        <p class="text-gray-600 dark:text-gray-300 text-sm mt-2">Mã đơn hàng: <span class="font-bold text-blue-600 dark:text-blue-400">{{ order?.code || '#ED-' + (order?.id || '---') }}</span></p>
      </div>

      <!-- Thông tin chi tiết đơn hàng khớp với Database SQL -->
      <div class="bg-gray-50 dark:bg-slate-800 p-6 rounded-lg mb-6 space-y-3 text-sm border border-gray-200 dark:border-slate-600">
        <div class="flex justify-between">
          <span class="text-gray-500 dark:text-gray-400">Mã định danh đơn (ID):</span>
          <span class="font-bold text-gray-900 dark:text-white">#{{ order?.id }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-500 dark:text-gray-400">Mã Tour ID:</span>
          <span class="font-bold text-gray-900 dark:text-white">Tour #{{ order?.tour_id }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-500 dark:text-gray-400">Số lượng học sinh tham gia (Pax):</span>
          <span class="font-bold text-gray-900 dark:text-white">{{ order?.pax || 30 }} học sinh</span>
        </div>
        <div class="flex justify-between border-t pt-3 border-gray-200 dark:border-slate-700 text-base">
          <span class="font-bold text-gray-900 dark:text-white">Tổng tiền thanh toán:</span>
          <span class="font-bold text-red-600 dark:text-red-400 text-lg">{{ Number(order?.total_amount || 450000).toLocaleString('vi-VN') }}đ</span>
        </div>
        <div class="flex justify-between items-center pt-2">
          <span class="text-gray-500 dark:text-gray-400">Trạng thái hiện tại:</span>
          <span class="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300 px-3 py-1 rounded-full text-xs font-bold">
            {{ order?.status || 'Chờ thanh toán' }}
          </span>
        </div>
      </div>

      <!-- Hướng dẫn chuyển khoản ngân hàng -->
      <div class="border border-blue-200 dark:border-slate-600 rounded-lg p-6 bg-blue-50/50 dark:bg-slate-800/50 mb-8">
        <h3 class="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <i class="fa-solid fa-qrcode text-blue-600"></i> Hướng dẫn thanh toán chuyển khoản
        </h3>
        <p class="text-xs text-gray-600 dark:text-gray-300 mb-4">Vui lòng sử dụng ứng dụng ngân hàng quét mã QR hoặc chuyển khoản theo thông tin dưới đây để hoàn tất thủ tục giữ chỗ:</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm items-center">
          <div class="space-y-2 text-gray-700 dark:text-gray-300">
            <div><strong>Ngân hàng:</strong> Techcombank (Chi nhánh Hà Nội)</div>
            <div><strong>Số tài khoản:</strong> <span class="text-blue-600 font-bold">19036888888888</span></div>
            <div><strong>Chủ tài khoản:</strong> QUY HOẠCH DU LỊCH SỐ EDUTOUR</div>
            <div><strong>Nội dung chuyển khoản:</strong> <span class="bg-white dark:bg-slate-700 px-2 py-0.5 rounded font-mono font-bold text-red-600">EDUTOUR #{{ order?.id }}</span></div>
          </div>
          
          <!-- Khung hiển thị ảnh VietQR động chuẩn xác -->
          <div class="flex justify-center items-center bg-white dark:bg-slate-700 p-4 rounded border">
            <div class="text-center">
              <img 
                :src="`https://img.vietqr.io/image/TCB-19036888888888-compact2.png?amount=${order?.total_amount || 450000}&addInfo=EDUTOUR%20%23${order?.id || ''}&accountName=QUY%20HOẠCH%20DU%20LỊCH%20SỐ%20EDUTOUR`" 
                alt="Mã QR Thanh Toán" 
                class="w-48 h-48 object-contain mx-auto"
              />
              <div class="text-[10px] text-gray-500 mt-1">Quét mã QR qua App Ngân hàng</div>
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
    const response = await axios.get(`/api/bookings/${orderId}`)
    order.value = response.data.data || response.data
  } catch (error) {
    console.error("Lỗi lấy thông tin đơn hàng:", error)
    try {
      const listRes = await axios.get(`/api/bookings`)
      const list = listRes.data.data || listRes.data
      if (Array.isArray(list) && list.length > 0) {
        order.value = list[list.length - 1]
      }
    } catch (err) {
      console.error("Fallback error:", err)
    }
  }
}

onMounted(() => {
  fetchOrderDetail()
})
</script>