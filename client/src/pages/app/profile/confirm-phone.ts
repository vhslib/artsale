import type { RouteRecordRaw } from 'vue-router'
import { authGuard } from '../../../router/middleware/auth-guard.js'
import { noPhoneVerificationGuard } from '../../../router/middleware/no-phone-verification-guard.js'

export const profileConfirmPhoneRoute: RouteRecordRaw = {
    name: 'Profile.ConfirmPhone',
    path: 'confirm-phone',
    component: () => import('./confirm-phone.vue'),
    meta: {
        middleware: [
            authGuard,
            noPhoneVerificationGuard
        ],
        async pageData(context) {
            await context.api.get('/confirmation/phone/get-code')
            return { data: undefined }
        }
    }
}
