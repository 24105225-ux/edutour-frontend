<template>
  <div class="max-w-2xl mx-auto px-4 py-12 flex-grow w-full">
    <div class="bg-white dark:bg-slate-700 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-slate-600">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-full text-2xl mb-3">
          <i class="fa-solid fa-star"></i>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Đánh Giá Chất Lượng Chuyến Đi</h2>
        <p class="text-gray-600 dark:text-gray-300 text-sm mt-1">Ý kiến của nhà trường giúp chúng tôi nâng cao chất lượng phục vụ các chương trình tiếp theo.</p>
      </div>

      <form @submit.prevent="submitFeedback" class="space-y-5">
        <div>
          <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Mã đơn hàng hoặc Tên trường học:</label>
          <input 
            v-model="form.school_name" 
            type="text" 
            required 
            placeholder="VD: Trường THPT Chu Văn An (Đơn #3)" 
            class="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2.5 text-sm bg-white dark:bg-slate-800 text-black dark:text-white focus:outline-none focus:border-blue-500"
          >
        </div>

        <div>
          <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Họ tên người đại diện / Giáo viên đánh giá:</label>
          <input 
            v-model="form.author" 
            type="text" 
            required 
            placeholder="VD: Thầy Nguyễn Văn Hùng (Hiệu phó)" 
            class="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2.5 text-sm bg-white dark:bg-slate-800 text-black dark:text-white focus:outline-none focus:border-blue-500"
          >
        </div>

        <div>
          <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Đánh giá mức độ hài lòng:</label>
          <div class="flex gap-2 text-2xl text-yellow-400 cursor-pointer">
            <i v-for="star in 5" :key="star" @click="form.rating = star" :class="star <= form.rating ? 'fa-solid fa-star' : 'fa-regular fa-star'"></i>
          </div>
        </div>

        <div>
          <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Nhận xét chi tiết về chuyến đi, độ an toàn & tổ chức:</label>
          <textarea 
            v-model="form.quote" 
            rows="4" 
            required 
            placeholder="Nhập cảm nhận thực tế của nhà trường..." 
            class="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2.5 text-sm bg-white dark:bg-slate-800 text-black dark:text-white focus:outline-none focus:border-blue-500"
          ></textarea>
        </div>

        <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow transition">
          Gửi Đánh Giá Chính Thức
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = ref({
  school_name: '',
  author: '',
  rating: 5,
  quote: ''
})

const submitFeedback = () => {
  if (!form.value.school_name || !form.value.quote) {
    alert('Vui lòng điền đầy đủ thông tin!')
    return
  }

  // Lưu tạm đánh giá vào localStorage để hệ thống hiển thị đồng bộ
  const existing = JSON.parse(localStorage.getItem('edutour_feedbacks') || '[]')
  const newFeedback = {
    quote: form.value.quote,
    author: form.value.author,
    role: form.value.school_name,
    initial: form.value.author.split(' ').pop()?.slice(0, 2).toUpperCase() || 'TR'
  }
  
  localStorage.setItem('edutour_feedbacks', JSON.stringify([newFeedback, ...existing]))

  alert('Cảm ơn nhà trường đã gửi phản hồi và đánh giá về chuyến đi!')
  router.push('/')
}
</script>