import type { RouteRecordRaw } from 'vue-router'

export const resetPasswordRoute: RouteRecordRaw = {
    name: 'ResetPassword',
    path: 'reset-password/:code',
    component: () => import('./reset-password.vue')
}
