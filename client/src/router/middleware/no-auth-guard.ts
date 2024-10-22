import type { Middleware } from '../../typings/vue-router.js'

export const noAuthGuard: Middleware = (context) => {
    if (context.store.profileData) {
        return { name: 'Profile.Info' }
    }
}
