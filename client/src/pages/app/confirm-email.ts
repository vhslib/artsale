import type { RouteRecordRaw } from 'vue-router'
import { getRouteParam } from '../../router/helpers.js'
import { authGuard } from '../../router/middleware/auth-guard.js'
import { noEmailVerificationGuard } from '../../router/middleware/no-email-verification-guard.js'
import { resolveNotFoundRoute } from '../not-found.js'

export const confirmEmailRoute: RouteRecordRaw = {
    path: 'confirm-email/:code',
    component: {},
    meta: {
        middleware: [
            authGuard,
            noEmailVerificationGuard,
            async (context, route) => {
                const code = getRouteParam(route, 'code')!
                const response = await context.api.post('/confirmation/email/send-code', { code })

                if (response.code === 'InvalidCode') {
                    return resolveNotFoundRoute(route)
                }

                context.store.profileData!.emailConfirmed = true
                return { name: 'Profile.Info' }
            }
        ]
    }
}
