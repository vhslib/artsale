import type { RouteRecordRaw } from 'vue-router'
import { bind } from '../util/bind.js'
import { aboutRoute } from './app/about.js'
import { adminRoute } from './app/admin.js'
import { confirmEmailRoute } from './app/confirm-email.js'
import { confirmPhoneRoute } from './app/confirm-phone.js'
import { contactsRoute } from './app/contacts.js'
import { forgotPasswordRoute } from './app/forgot-password.js'
import { homeRoute } from './app/home.js'
import { itemRoute } from './app/item.js'
import { loginRoute } from './app/login.js'
import { profileRoute } from './app/profile.js'
import { registerRoute } from './app/register.js'
import { resetPasswordRoute } from './app/reset-password.js'
import { searchRoute } from './app/search.js'
import { userItemsRoute } from './app/user-items.js'

export const appRoute: RouteRecordRaw = {
    path: '/app',
    component: () => import('./app.vue'),
    meta: {
        middleware: [
            async (context) => {
                if (context.navigationType === 'hydration' || context.alreadyFetchedStoreData) {
                    return
                }

                await Promise.all([
                    context.store.fetchCategories(),
                    bind(context.storage.get('vhslibrary'), () => context.store.fetchProfileData())
                ])

                context.alreadyFetchedStoreData = true
            }
        ],
        after: [
            (context) => {
                context.alreadyFetchedStoreData = false
            }
        ]
    },
    children: [
        aboutRoute,
        itemRoute,
        contactsRoute,
        forgotPasswordRoute,
        homeRoute,
        loginRoute,
        profileRoute,
        registerRoute,
        searchRoute,
        userItemsRoute,
        confirmEmailRoute,
        confirmPhoneRoute,
        resetPasswordRoute,
        adminRoute
    ]
}
