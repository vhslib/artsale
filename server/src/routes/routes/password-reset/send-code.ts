import { PasswordResetSendCodeRequest } from 'artsale-shared'
import bcrypt from 'bcrypt'
import { db } from '../../../prisma.js'
import { definePostRoute } from '../../../routing.js'
import { logUserAction } from '../../../services/user-action-logging.js'

export const passwordResetSendCodeRoute = definePostRoute({
    path: '/password-reset/send-code',
    request: PasswordResetSendCodeRequest,
    async handler(data) {
        const user = await db.user.findFirst({
            where: {
                passwordResetCode: data.code
            }
        })

        if (!user) {
            return { code: 'InvalidCode' }
        }

        const newPasswordHashed = await bcrypt.hash(data.password, 10)

        await db.user.update({
            where: {
                id: user.id
            },
            data: {
                password: newPasswordHashed,
                passwordResetCode: null
            }
        })

        await logUserAction(user.id, {
            type: 'PASSWORD_RESET_SEND_CODE'
        })

        return {
            code: 'Ok',
            email: user.email
        }
    }
})
