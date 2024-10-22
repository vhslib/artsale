import type { RouteRecordRaw } from 'vue-router'
import { authGuard } from '../../../router/middleware/auth-guard.js'
import { verificationGuard } from '../../../router/middleware/verification-guard.js'

export const profileNewItemRoute: RouteRecordRaw = {
    name: 'Profile.NewItem',
    path: 'new-item',
    component: () => import('./new-item.vue'),
    meta: {
        middleware: [
            authGuard,
            verificationGuard
        ]
    }
}
