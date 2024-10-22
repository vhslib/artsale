import type { RouteRecordRaw } from 'vue-router'
import { authGuard } from '../../../router/middleware/auth-guard.js'

export const profileEditInfoRoute: RouteRecordRaw = {
    name: 'Profile.EditInfo',
    path: 'edit-info',
    component: () => import('./edit-info.vue'),
    meta: {
        middleware: [
            authGuard
        ]
    }
}
