import type { Middleware } from '../../typings/vue-router.js'

export const noEmailVerificationGuard: Middleware = (context) => {
    if (context.store.profileData!.emailConfirmed) {
        return { name: 'Profile.Info' }
    }
}
