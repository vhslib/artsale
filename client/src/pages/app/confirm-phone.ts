import type { RouteRecordRaw } from 'vue-router'
import { getRouteParam } from '../../router/helpers.js'
import { authGuard } from '../../router/middleware/auth-guard.js'
import { noPhoneVerificationGuard } from '../../router/middleware/no-phone-verification-guard.js'
import { resolveNotFoundRoute } from '../not-found.js'

export const confirmPhoneRoute: RouteRecordRaw = {
    path: 'confirm-phone/:code',
    component: {},
    meta: {
        middleware: [
            authGuard,
            noPhoneVerificationGuard,
            async (context, route) => {
                const code = getRouteParam(route, 'code')!
                const response = await context.api.post('/confirmation/phone/send-code', { code })

                if (response.code === 'InvalidCode') {
                    return resolveNotFoundRoute(route)
                }

                context.store.profileData!.phoneConfirmed = true
                return { name: 'Profile.Info' }
            }
        ]
    }
}
