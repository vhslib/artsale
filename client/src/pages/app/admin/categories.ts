import type { RouteRecordRaw } from 'vue-router'
import { adminGuard } from '../../../router/middleware/admin-guard.js'

export const adminCategoriesRoute: RouteRecordRaw = {
    name: 'Admin.Categories',
    path: 'categories',
    component: () => import('./categories.vue'),
    meta: {
        middleware: [
            adminGuard
        ]
    }
}
