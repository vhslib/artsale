import type { RouteRecordRaw } from 'vue-router'
import { authGuard } from '../../../router/middleware/auth-guard.js'

export const profileInfoRoute: RouteRecordRaw = {
    name: 'Profile.Info',
    path: 'info',
    component: () => import('./info.vue'),
    meta: {
        middleware: [
            authGuard
        ]
    }
}
