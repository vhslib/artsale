import { ProfileUpdateRequest } from 'artsale-shared'
import { authMiddleware } from '../../../middleware/auth.js'
import { db } from '../../../prisma.js'
import { definePostRoute } from '../../../routing.js'
import { logUserAction } from '../../../services/user-action-logging.js'

export const profileUpdateRoute = definePostRoute({
    path: '/profile/update',
    request: ProfileUpdateRequest,
    middleware: [
        authMiddleware
    ],
    async handler(data, request) {
        const existingUser = await db.user.findFirst({
            where: {
                OR: [
                    { email: data.email },
                    { phone: data.phone }
                ]
            }
        })

        if (existingUser && existingUser.id !== request.user!.id) {
            return { code: 'LoginTaken' }
        }

        await db.user.update({
            where: {
                id: request.user!.id
            },
            data: {
                email: data.email,
                phone: data.phone,
                firstName: data.firstName,
                lastName: data.lastName,
                emailConfirmed: data.email === undefined ? undefined : false,
                phoneConfirmed: data.phone === undefined ? undefined : false
            }
        })

        await logUserAction(request.user!.id, {
            type: 'PROFILE_UPDATE',
            email: data.email,
            phone: data.phone,
            firstName: data.firstName,
            lastName: data.lastName
        })

        return { code: 'Ok' }
    }
})
