<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-950 px-4 py-12">
    <div class="max-w-md w-full bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-slate-800 transition-all duration-300">
      
      <!-- Thanh Tabs chuyển đổi Đăng Nhập / Đăng Ký -->
      <div class="flex border-b border-gray-100 dark:border-slate-800">
        <button 
          @click="isLogin = true"
          :class="isLogin ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 font-semibold bg-blue-50/50 dark:bg-slate-800/50' : 'text-gray-500 hover:text-gray-700 dark:text-slate-400'"
          class="flex-1 py-4 text-center transition-all duration-200 text-sm"
        >
          Đăng Nhập
        </button>
        <button 
          @click="isLogin = false"
          :class="!isLogin ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 font-semibold bg-blue-50/50 dark:bg-slate-800/50' : 'text-gray-500 hover:text-gray-700 dark:text-slate-400'"
          class="flex-1 py-4 text-center transition-all duration-200 text-sm"
        >
          Đăng Ký Tài Khoản
        </button>
      </div>

      <!-- Phần thân chứa Form -->
      <div class="p-8">
        <div class="text-center mb-6">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
            {{ isLogin ? 'Chào mừng trở lại!' : 'Tạo tài khoản mới' }}
          </h2>
          <p class="text-sm text-gray-500 dark:text-slate-400 mt-1">
            {{ isLogin ? 'Đăng nhập để quản lý hệ thống EduTour' : 'Đăng ký thành viên để trải nghiệm hệ thống' }}
          </p>
        </div>

        <!-- FORM ĐĂNG NHẬP -->
        <form v-if="isLogin" @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label class="block text-xs font-medium text-gray-700 dark:text-slate-300 mb-1">Email quản trị / tài khoản</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><i class="fas fa-envelope"></i></span>
              <input 
                v-model="loginForm.email" 
                type="email" 
                required
                class="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white dark:text-white outline-none transition"
                placeholder="admin@edutour.test"
              />
            </div>
          </div>

          <div>
            <label class="block text-xs font-medium text-gray-700 dark:text-slate-300 mb-1">Mật khẩu</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><i class="fas fa-lock"></i></span>
              <input 
                v-model="loginForm.password" 
                type="password" 
                required
                class="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white dark:text-white outline-none transition"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            class="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-lg shadow-blue-500/30 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <span>Đăng Nhập Ngay</span>
            <i class="fas fa-arrow-right text-xs"></i>
          </button>
        </form>

        <!-- FORM ĐĂNG KÝ -->
        <form v-else @submit.prevent="handleRegister" class="space-y-4">
          <div>
            <label class="block text-xs font-medium text-gray-700 dark:text-slate-300 mb-1">Họ và tên</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><i class="fas fa-user"></i></span>
              <input 
                v-model="registerForm.name" 
                type="text" 
                required
                class="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white dark:text-white outline-none transition"
                placeholder="Nguyễn Văn A"
              />
            </div>
          </div>

          <div>
            <label class="block text-xs font-medium text-gray-700 dark:text-slate-300 mb-1">Email</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><i class="fas fa-envelope"></i></span>
              <input 
                v-model="registerForm.email" 
                type="email" 
                required
                class="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white dark:text-white outline-none transition"
                placeholder="user@edutour.test"
              />
            </div>
          </div>

          <div>
            <label class="block text-xs font-medium text-gray-700 dark:text-slate-300 mb-1">Mật khẩu</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><i class="fas fa-lock"></i></span>
              <input 
                v-model="registerForm.password" 
                type="password" 
                required
                class="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white dark:text-white outline-none transition"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <label class="block text-xs font-medium text-gray-700 dark:text-slate-300 mb-1">Xác nhận mật khẩu</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><i class="fas fa-lock"></i></span>
              <input 
                v-model="registerForm.password_confirmation" 
                type="password" 
                required
                class="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white dark:text-white outline-none transition"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            class="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl shadow-lg shadow-emerald-500/30 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <span>Đăng Ký Tài Khoản</span>
            <i class="fas fa-user-plus text-xs"></i>
          </button>
        </form>

        <!-- Nút quay lại trang chủ -->
        <div class="mt-6 text-center">
          <router-link to="/" class="text-xs text-gray-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition">
            <i class="fas fa-arrow-left mr-1"></i> Quay lại trang chủ EduTour
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const isLogin = ref(true)

const loginForm = ref({
  email: '',
  password: ''
})

const registerForm = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
})

const handleLogin = async () => {
  try {
    const response = await axios.post('/api/login', loginForm.value)
    
    // Tự động quét mọi định dạng token mà Laravel có thể trả về để lưu an toàn tuyệt đối
    const token = response.data.access_token || response.data.token || response.data.data?.token
    const user = response.data.user || response.data.data?.user

    if (token) {
      localStorage.setItem('auth_token', token)
    }
    if (user) {
      localStorage.setItem('user_info', JSON.stringify(user))
    }
    
    alert('Đăng nhập thành công!')

    if (user?.role === 'admin') {
      router.push('/dashboard')
    } else {
      router.push('/')
    }
  } catch (error: any) {
    console.error(error)
    const msg = error.response?.data?.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin!'
    alert(msg)
  }
}

const handleRegister = async () => {
  if (registerForm.value.password !== registerForm.value.password_confirmation) {
    alert('Mật khẩu xác nhận không khớp!')
    return
  }
  
  try {
    await axios.post('/api/register', registerForm.value)
    
    alert('Đăng ký tài khoản thành công! Dữ liệu đã được lưu vào Database.')
    
    loginForm.value.email = registerForm.value.email
    isLogin.value = true
  } catch (error: any) {
    console.error(error)
    const msg = error.response?.data?.message || 'Đăng ký thất bại. Email có thể đã tồn tại trong hệ thống!'
    alert(msg)
  }
}
</script>