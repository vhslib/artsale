import type { RouteRecordRaw } from 'vue-router'

export const forgotPasswordRoute: RouteRecordRaw = {
    name: 'ForgotPassword',
    path: 'forgot-password',
    component: () => import('./forgot-password.vue')
}
