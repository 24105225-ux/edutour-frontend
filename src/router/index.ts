import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import BookingView from '../views/BookingView.vue' // Import trang quản lý thanh toán
import TourDetailView from '../views/TourDetailView.vue'
import CheckoutView from '../views/CheckoutView.vue'
import FeedbackView from '../views/FeedbackView.vue'

// Thêm vào mảng routes:

// Thêm vào trong mảng routes:


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: DashboardView
        },
        {
            path: '/bookings',
            name: 'bookings',
            component: BookingView
        },
        { path: '/tour/:id', name: 'tour-detail', component: TourDetailView }, // Đã thêm dấu phẩy phân tách đầy đủ giữa các phần tử trong mảng
        { path: '/checkout/:id', name: 'checkout', component: CheckoutView }, // Đã thêm dấu phẩy phân tách đầy đủ giữa các phần tử trong mản
        { path: '/feedback', name: 'feedback', component: FeedbackView }
    ]
})

export default router