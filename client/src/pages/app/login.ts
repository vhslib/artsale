import type { RouteRecordRaw } from 'vue-router'
import { noAuthGuard } from '../../router/middleware/no-auth-guard.js'

export const loginRoute: RouteRecordRaw = {
    name: 'Login',
    path: 'login',
    component: () => import('./login.vue'),
    meta: {
        middleware: [
            noAuthGuard
        ]
    }
}
