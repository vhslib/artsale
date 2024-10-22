import { ProfileChangePasswordRequest } from 'artsale-shared'
import bcrypt from 'bcrypt'
import { authMiddleware } from '../../../middleware/auth.js'
import { db } from '../../../prisma.js'
import { definePostRoute } from '../../../routing.js'
import { logUserAction } from '../../../services/user-action-logging.js'

export const profileChangePasswordRoute = definePostRoute({
    path: '/profile/change-password',
    request: ProfileChangePasswordRequest,
    middleware: [
        authMiddleware
    ],
    async handler(data, request) {
        const passwordsMatch = await bcrypt.compare(data.oldPassword, request.user!.password)

        if (!passwordsMatch) {
            return { code: 'WrongPassword' }
        }

        const newPasswordHashed = await bcrypt.hash(data.newPassword, 10)

        await db.user.update({
            where: {
                id: request.user!.id
            },
            data: {
                password: newPasswordHashed
            }
        })

        await logUserAction(request.user!.id, {
            type: 'PROFILE_CHANGE_PASSWORD'
        })

        return { code: 'Ok' }
    }
})
