import type { RouteRecordRaw } from 'vue-router'
import { resolveNotFoundRoute } from '../not-found.js'
import { adminCategoriesRoute } from './admin/categories.js'

export const adminRoute: RouteRecordRaw = {
    path: 'admin',
    component: () => import('./admin.vue'),
    children: [
        adminCategoriesRoute,
        {
            path: '',
            redirect: resolveNotFoundRoute
        }
    ]
}
