import type { Middleware } from '../../typings/vue-router.js'

export const noPhoneVerificationGuard: Middleware = (context) => {
    if (context.store.profileData!.phoneConfirmed) {
        return { name: 'Profile.Info' }
    }
}
