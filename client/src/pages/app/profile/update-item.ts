import type { RouteRecordRaw } from 'vue-router'
import { getRouteParam } from '../../../router/helpers.js'
import { authGuard } from '../../../router/middleware/auth-guard.js'
import { verificationGuard } from '../../../router/middleware/verification-guard.js'
import { stringToNumber } from '../../../util/string-to-number.js'
import { resolveNotFoundRoute } from '../../not-found.js'

export const profileUpdateItemRoute: RouteRecordRaw = {
    name: 'Profile.UpdateItem',
    path: 'update-item/:itemId([1-9]+)',
    component: () => import('./update-item.vue'),
    meta: {
        middleware: [
            authGuard,
            verificationGuard
        ],
        async pageData(context, route) {
            const id = stringToNumber(getRouteParam(route, 'itemId'))!
            const response = await context.api.post('/items/get-by-id', { id })

            if (response.code === 'NotFound') {
                return { redirect: resolveNotFoundRoute(route) }
            }

            return { data: response }
        }
    }
}
