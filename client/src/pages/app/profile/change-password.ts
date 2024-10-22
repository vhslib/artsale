import type { RouteRecordRaw } from 'vue-router'
import { authGuard } from '../../../router/middleware/auth-guard.js'

export const profileChangePasswordRoute: RouteRecordRaw = {
    name: 'Profile.ChangePassword',
    path: 'change-password',
    component: () => import('./change-password.vue'),
    meta: {
        middleware: [
            authGuard
        ]
    }
}
