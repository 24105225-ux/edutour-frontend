<template>
  <nav class="bg-blue-800 dark:bg-gray-900 text-white shadow-lg transition-colors duration-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        
        <!-- Khối bên trái: Logo & Tên đồ án -->
        <div class="flex-shrink-0 font-bold text-xl flex items-center gap-2">
          <RouterLink to="/" class="flex items-center gap-2 text-white hover:text-blue-200 transition">
            <i class="fa-solid fa-bus-school"></i> 
            <span>ĐT-17 EduTour</span>
          </RouterLink>
        </div>

        <!-- Khối bên phải: Các liên kết và nút chức năng -->
        <div class="hidden md:flex items-center space-x-4">
          
          <!-- Các liên kết điều hướng chính -->
          <RouterLink to="/my-bookings" class="text-gray-200 hover:text-white font-medium text-sm transition">
            {{ t('Tra cứu đơn hàng') }}
          </RouterLink>
          <RouterLink to="/feedback" class="text-gray-200 hover:text-white font-medium text-sm transition">
            {{ t('Đánh giá tour') }}
          </RouterLink>

          <!-- Nút Đổi ngôn ngữ -->
          <button @click="toggleLanguage" class="bg-blue-700 hover:bg-blue-600 text-white px-3 py-1.5 rounded text-xs font-semibold shadow transition min-w-[110px]">
            {{ isEnglish ? '🌐 English' : '🇻🇳 Tiếng Việt' }}
          </button>

          <!-- Nút Đổi giao diện Sáng / Tối -->
          <button @click="toggleTheme" class="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1.5 rounded text-xs font-semibold shadow transition min-w-[130px]">
            {{ isDark ? '☀️ Giao Diện Sáng' : '🌙 Đổi Giao Diện' }}
          </button>

          <!-- HIỂN THỊ THEO TRẠNG THÁI ĐĂNG NHẬP -->
          <template v-if="currentUser">
            <!-- Hiển thị tên người dùng / Admin -->
            <div class="flex items-center gap-3 bg-blue-900/60 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-blue-700/50">
              <span class="text-sm font-semibold text-blue-100 flex items-center gap-1.5 max-w-[150px] truncate" :title="currentUser.name || currentUser.email">
  <i class="fas fa-user-circle text-emerald-400 text-base"></i> 
  <span class="truncate">{{ currentUser.name || currentUser.email || 'Tài khoản' }}</span>
</span>
              <button 
                @click="handleLogout"
                class="text-xs bg-red-600 hover:bg-red-500 text-white px-2.5 py-1 rounded transition font-medium"
                title="Đăng xuất"
              >
                <i class="fas fa-sign-out-alt"></i>
              </button>
            </div>
          </template>

          <template v-else>
            <!-- Nút Đăng nhập hệ thống (Khi chưa đăng nhập) -->
            <RouterLink to="/login" class="bg-green-600 hover:bg-green-500 px-4 py-2 rounded text-sm font-bold shadow flex items-center gap-1.5 transition">
              <i class="fa-solid fa-lock"></i> 
              <span>{{ t('Đăng nhập hệ thống') }}</span>
            </RouterLink>
          </template>

        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useApp } from '../composables/useApp'

const router = useRouter()
const { isDark, isEnglish, t, toggleTheme, toggleLanguage } = useApp()

const currentUser = ref<any>(null)

// Kiểm tra thông tin user từ localStorage khi Navbar được load
onMounted(() => {
  const userStr = localStorage.getItem('user_info')
  if (userStr) {
    try {
      currentUser.value = JSON.parse(userStr)
    } catch (e) {
      currentUser.value = null
    }
  }
})

// Hàm xử lý đăng xuất
const handleLogout = () => {
  localStorage.removeItem('auth_token')
  localStorage.removeItem('user_info')
  currentUser.value = null
  router.push('/login')
}
</script>