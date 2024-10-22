import type { RouteLocationNormalized, RouteLocationRaw, RouteRecordRaw } from 'vue-router'

export const notFoundRoute: RouteRecordRaw = {
    name: 'NotFound',
    path: '/:pathMatch(.*)*',
    component: () => import('./not-found.vue')
}

export function resolveNotFoundRoute(route: RouteLocationNormalized): RouteLocationRaw {
    return {
        name: 'NotFound',
        params: {
            pathMatch: route.path.split('/').slice(1)
        },
        query: route.query
    }
}
