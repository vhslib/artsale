import type { Middleware } from '../../typings/vue-router.js'

export const authGuard: Middleware = (context) => {
    if (!context.store.profileData) {
        return { name: 'Login' }
    }
}
