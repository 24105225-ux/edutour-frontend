import './assets/themes/theme.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

// Cấu hình URL mặc định cho Axios trỏ thẳng tới Backend trên Render
axios.defaults.baseURL = 'https://edutour-backend.onrender.com'

const app = createApp(App)
app.use(router)
app.mount('#app')