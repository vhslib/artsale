import type { RouteRecordRaw } from 'vue-router'

export const dummyRoute: RouteRecordRaw = {
    name: 'Dummy',
    path: '/',
    component: () => import('./dummy.vue')
}
