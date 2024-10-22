import type { RouteRecordRaw } from 'vue-router'

export const aboutRoute: RouteRecordRaw = {
    name: 'About',
    path: 'about',
    component: () => import('./about.vue')
}
