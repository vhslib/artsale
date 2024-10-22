import type { RouteRecordRaw } from 'vue-router'

export const contactsRoute: RouteRecordRaw = {
    name: 'Contacts',
    path: 'contacts',
    component: () => import('./contacts.vue')
}
