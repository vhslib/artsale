import type { RouteRecordRaw } from 'vue-router'
import { getRouteParam } from '../../../router/helpers.js'
import { authGuard } from '../../../router/middleware/auth-guard.js'
import { verificationGuard } from '../../../router/middleware/verification-guard.js'
import { stringToNumber } from '../../../util/string-to-number.js'
import { resolveNotFoundRoute } from '../../not-found.js'

export const profileChatRoute: RouteRecordRaw = {
    name: 'Profile.Chat',
    path: 'chat/:userId([1-9]+)',
    component: () => import('./chat.vue'),
    meta: {
        middleware: [
            authGuard,
            verificationGuard
        ],
        async pageData(context, route) {
            const userId = stringToNumber(getRouteParam(route, 'userId'))!
            const response = await context.api.post('/chats/get-by-user', { userId })

            if (response.code === 'NotFound') {
                return { redirect: resolveNotFoundRoute(route) }
            }

            return { data: response }
        }
    }
}
