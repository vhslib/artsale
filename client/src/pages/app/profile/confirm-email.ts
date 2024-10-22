import type { RouteRecordRaw } from 'vue-router'
import { authGuard } from '../../../router/middleware/auth-guard.js'
import { noEmailVerificationGuard } from '../../../router/middleware/no-email-verification-guard.js'

export const profileConfirmEmailRoute: RouteRecordRaw = {
    name: 'Profile.ConfirmEmail',
    path: 'confirm-email',
    component: () => import('./confirm-email.vue'),
    meta: {
        middleware: [
            authGuard,
            noEmailVerificationGuard
        ],
        async pageData(context) {
            const response = await context.api.get('/confirmation/email/get-code')
            return { data: response }
        }
    }
}
