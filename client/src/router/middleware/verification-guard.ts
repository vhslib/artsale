import { showInfoModal } from '../../modals/info-modal.js'
import type { Middleware } from '../../typings/vue-router.js'

export const verificationGuard: Middleware = async (context) => {
    const { emailConfirmed, phoneConfirmed } = context.store.profileData!

    if (!emailConfirmed || !phoneConfirmed) {
        if (!import.meta.env.SSR) {
            await showInfoModal({
                message: 'Для просмотра этой страницы требуется подтвердить почту и телефон'
            })
        }

        return { name: 'Profile.Info' }
    }
}
