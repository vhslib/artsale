import type { RouteRecordRaw } from 'vue-router'
import { resolveNotFoundRoute } from '../not-found.js'
import { profileChangePasswordRoute } from './profile/change-password.js'
import { profileChatRoute } from './profile/chat.js'
import { profileChatsRoute } from './profile/chats.js'
import { profileConfirmEmailRoute } from './profile/confirm-email.js'
import { profileConfirmPhoneRoute } from './profile/confirm-phone.js'
import { profileEditInfoRoute } from './profile/edit-info.js'
import { profileInfoRoute } from './profile/info.js'
import { profileItemsRoute } from './profile/items.js'
import { profileNewItemRoute } from './profile/new-item.js'
import { profileUpdateItemRoute } from './profile/update-item.js'

export const profileRoute: RouteRecordRaw = {
    path: 'profile',
    component: () => import('./profile.vue'),
    children: [
        profileItemsRoute,
        profileChangePasswordRoute,
        profileConfirmEmailRoute,
        profileConfirmPhoneRoute,
        profileEditInfoRoute,
        profileInfoRoute,
        profileNewItemRoute,
        profileUpdateItemRoute,
        profileChatsRoute,
        profileChatRoute,
        {
            path: '',
            redirect: resolveNotFoundRoute
        }
    ]
}
