import { PasswordResetGetCodeRequest } from 'artsale-shared'
import { db } from '../../../prisma.js'
import { definePostRoute } from '../../../routing.js'
import { sendEmailWithTemplate } from '../../../services/mail.js'
import { logUserAction } from '../../../services/user-action-logging.js'
import { createSuperRandomId } from '../../../util/super-random-id.js'

export const passwordResetGetCodeRoute = definePostRoute({
    path: '/password-reset/get-code',
    request: PasswordResetGetCodeRequest,
    async handler(data) {
        const user = await db.user.findFirst({
            where: {
                email: data.email
            }
        })

        if (!user) {
            return { code: 'InvalidEmail' }
        }

        const code = createSuperRandomId(15)

        const success = await sendEmailWithTemplate(user, 'Сброс пароля', 'passwordReset', {
            user,
            code
        })

        if (!success) {
            return { code: 'CannotSendMail' }
        }

        await db.user.update({
            where: {
                id: user.id
            },
            data: {
                passwordResetCode: code
            }
        })


        await logUserAction(user.id, {
            type: 'PASSWORD_RESET_GET_CODE'
        })

        return { code: 'Ok' }
    }
})
