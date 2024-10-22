import type { RouteRecordRaw } from 'vue-router'
import { authGuard } from '../../../router/middleware/auth-guard.js'
import { verificationGuard } from '../../../router/middleware/verification-guard.js'

export const profileChatsRoute: RouteRecordRaw = {
    name: 'Profile.Chats',
    path: 'chats',
    component: () => import('./chats.vue'),
    meta: {
        middleware: [
            authGuard,
            verificationGuard
        ],
        async pageData(context) {
            const response = await context.api.get('/chats/my')
            return { data: response }
        }
    }
}
