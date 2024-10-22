import type { RouteRecordRaw } from 'vue-router'
import { getRouteParam } from '../../router/helpers.js'
import { stringToNumber } from '../../util/string-to-number.js'
import { resolveNotFoundRoute } from '../not-found.js'

export const userItemsRoute: RouteRecordRaw = {
    name: 'UserItems',
    path: 'user-items/:userId([1-9]+)',
    component: () => import('./user-items.vue'),
    meta: {
        async pageData(context, route) {
            const authorId = stringToNumber(getRouteParam(route, 'userId'))!
            const response = await context.api.post('/items/get-by-author', { authorId })

            if (response.code === 'NotFound') {
                return { redirect: resolveNotFoundRoute(route) }
            }

            return { data: response }
        }
    }
}
