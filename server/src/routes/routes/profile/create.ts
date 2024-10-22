import { ProfileCreateRequest } from 'artsale-shared'
import bcrypt from 'bcrypt'
import { db } from '../../../prisma.js'
import { definePostRoute } from '../../../routing.js'
import { logUserAction } from '../../../services/user-action-logging.js'

export const profileCreateRoute = definePostRoute({
    path: '/profile/create',
    request: ProfileCreateRequest,
    async handler(data) {
        const existingUser = await db.user.findFirst({
            where: {
                OR: [
                    { email: data.email },
                    { phone: data.phone }
                ]
            }
        })

        if (existingUser) {
            return { code: 'LoginTaken' }
        }

        const passwordHashed = await bcrypt.hash(data.password, 10)

        const user = await db.user.create({
            data: {
                email: data.email,
                phone: data.phone,
                firstName: data.firstName,
                lastName: data.lastName,
                password: passwordHashed
            }
        })

        await logUserAction(user.id, {
            type: 'PROFILE_CREATE',
            email: data.email,
            phone: data.phone,
            firstName: data.firstName,
            lastName: data.lastName
        })

        return { code: 'Ok' }
    }
})
