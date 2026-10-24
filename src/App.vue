<template>
  <div class="bg-gray-50 dark:bg-slate-900 text-gray-800 font-sans antialiased flex flex-col min-h-screen transition-colors duration-300">
    <!-- Chỉ hiển thị Navbar khi KHÔNG phải trang login -->
    <Navbar v-if="!isAuthRoute" />
    
    <!-- Nội dung thay đổi của trang -->
    <RouterView class="flex-grow" />
    
    <!-- Chỉ hiển thị Footer khi KHÔNG phải trang login -->
    <footer v-if="!isAuthRoute" class="bg-gray-800 dark:bg-slate-950 text-gray-400 py-8 text-center mt-auto">
        <p class="mb-2 text-gray-300">Học phần: <strong>CSE703073 - Lập trình ứng dụng web trong du lịch 2</strong> &mdash; Nhóm: <strong>Nhóm ĐT-17</strong></p>
        <p class="text-sm"><em>Sản phẩm học thuật &ndash; phục vụ mục đích đào tạo.</em></p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'
import { useApp } from './composables/useApp'

const { initTheme } = useApp()
const route = useRoute()

// Kiểm tra xem route hiện tại có phải trang login không (có thể mở rộng thêm các trang dashboard nếu cần)
const isAuthRoute = computed(() => {
  return route.path === '/login' || route.path.startsWith('/dashboard')
})

onMounted(() => {
  initTheme()
  // Tự động nhúng icon FontAwesome
  const script = document.createElement('script')
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/js/all.min.js'
  document.head.appendChild(script)
})
</script>