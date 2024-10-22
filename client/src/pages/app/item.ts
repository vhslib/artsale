import type { Category, Item } from 'artsale-shared'
import type { RouteLocationRaw, RouteRecordRaw } from 'vue-router'
import { getRouteParam } from '../../router/helpers.js'
import { createSlug } from '../../util/slug.js'
import { stringToNumber } from '../../util/string-to-number.js'
import { resolveNotFoundRoute } from '../not-found.js'

export const itemRoute: RouteRecordRaw = {
    name: 'Item',
    path: ':category/:slug(.+)__:id([1-9]+)',
    component: () => import('./item.vue'),
    meta: {
        async pageData(context, route) {
            const category = context.store.findCategoryBySlug(getRouteParam(route, 'category')!)

            if (!category) {
                return { redirect: resolveNotFoundRoute(route) }
            }

            const slug = getRouteParam(route, 'slug')!
            const id = stringToNumber(getRouteParam(route, 'id'))!

            const response = await context.api.post('/items/get-by-id', { id })

            if (response.code === 'NotFound') {
                return { redirect: resolveNotFoundRoute(route) }
            }

            if (response.item.categoryId !== category.id || createSlug(response.item.name) !== slug) {
                return { redirect: resolveNotFoundRoute(route) }
            }

            return { data: response }
        }
    }
}

export function resolveItemRoute(category: Category, item: Item): RouteLocationRaw {
    return {
        name: 'Item',
        params: {
            category: createSlug(category.name),
            slug: createSlug(item.name),
            id: item.id
        }
    }
}
