import { BadRequestError } from '../../../../errors/bad-request-error.js'
import { authMiddleware } from '../../../../middleware/auth.js'
import { db } from '../../../../prisma.js'
import { defineGetRoute } from '../../../../routing.js'
import { sendEmailWithTemplate } from '../../../../services/mail.js'
import { logUserAction } from '../../../../services/user-action-logging.js'
import { createSuperRandomId } from '../../../../util/super-random-id.js'

export const confirmationEmailGetCodeRoute = defineGetRoute({
    path: '/confirmation/email/get-code',
    middleware: [
        authMiddleware
    ],
    async handler(request) {
        if (request.user!.emailConfirmed) {
            throw new BadRequestError()
        }

        const code = createSuperRandomId(15)

        const success = await sendEmailWithTemplate(request.user!, 'Подтверждение профиля', 'confirmation', {
            user: request.user!,
            code
        })

        if (!success) {
            return { code: 'CannotSendMail' }
        }

        await db.user.update({
            where: {
                id: request.user!.id
            },
            data: {
                emailConfirmationCode: code
            }
        })

        await logUserAction(request.user!.id, {
            type: 'CONFIRMATION_GET_EMAIL_CODE'
        })

        return { code: 'Ok' }
    }
})
