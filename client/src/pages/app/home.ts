import type { RouteRecordRaw } from 'vue-router'

export const homeRoute: RouteRecordRaw = {
    name: 'Home',
    path: '',
    component: () => import('./home.vue'),
    meta: {
        async pageData(context) {
            const response = await context.api.post('/items/search', { query: '' })
            return { data: response }
        }
    }
}
