import type { RouteRecordRaw } from 'vue-router'
import { getRouteParam, getRouteQuery } from '../../router/helpers.js'
import { parseProperties } from '../../services/search.js'
import { bind } from '../../util/bind.js'
import { stringToNumberStrict } from '../../util/string-to-number-strict.js'
import { toEntries } from '../../util/to-entries.js'
import { resolveNotFoundRoute } from '../not-found.js'

export const searchRoute: RouteRecordRaw = {
    name: 'Search',
    path: ':category/:properties*',
    component: () => import('./search.vue'),
    meta: {
        async pageData(context, route) {
            const categoryParam = getRouteParam(route, 'category')!
            const categorySlug = categoryParam === 'all' ? undefined : categoryParam
            const category = bind(categorySlug, context.store.findCategoryBySlug)

            if (categorySlug !== undefined && !category) {
                return { redirect: resolveNotFoundRoute(route) }
            }

            const properties = bind(category, (c) => parseProperties(route, c))

            if (category && !properties) {
                return { redirect: resolveNotFoundRoute(route) }
            }

            const response = await context.api.post('/items/search', {
                query: getRouteQuery(route, 'query')?.trim() ?? '',
                categoryId: category?.id,
                properties: bind(properties, toEntries),
                priceFrom: stringToNumberStrict(getRouteQuery(route, 'priceFrom')),
                priceTo: stringToNumberStrict(getRouteQuery(route, 'priceTo'))
            })

            return {
                data: {
                    response,
                    properties
                }
            }
        }
    }
}
