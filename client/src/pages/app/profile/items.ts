import type { RouteRecordRaw } from 'vue-router'
import { authGuard } from '../../../router/middleware/auth-guard.js'
import { verificationGuard } from '../../../router/middleware/verification-guard.js'

export const profileItemsRoute: RouteRecordRaw = {
    name: 'Profile.Items',
    path: 'items',
    component: () => import('./items.vue'),
    meta: {
        middleware: [
            authGuard,
            verificationGuard
        ],
        async pageData(context) {
            const response = await context.api.get('/items/my')
            return { data: response }
        }
    }
}
