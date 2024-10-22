import type { RouteRecordRaw } from 'vue-router'
import { noAuthGuard } from '../../router/middleware/no-auth-guard.js'

export const registerRoute: RouteRecordRaw = {
    name: 'Register',
    path: 'register',
    component: () => import('./register.vue'),
    meta: {
        middleware: [
            noAuthGuard
        ]
    }
}
