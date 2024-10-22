import { ConfirmationEmailSendCodeRequest } from 'artsale-shared'
import { BadRequestError } from '../../../../errors/bad-request-error.js'
import { authMiddleware } from '../../../../middleware/auth.js'
import { db } from '../../../../prisma.js'
import { definePostRoute } from '../../../../routing.js'
import { logUserAction } from '../../../../services/user-action-logging.js'

export const confirmationEmailSendCodeRoute = definePostRoute({
    path: '/confirmation/email/send-code',
    request: ConfirmationEmailSendCodeRequest,
    middleware: [
        authMiddleware
    ],
    async handler(data, request) {
        if (request.user!.emailConfirmed) {
            throw new BadRequestError()
        }

        if (data.code !== request.user!.emailConfirmationCode) {
            return { code: 'InvalidCode' }
        }

        await db.user.update({
            where: {
                id: request.user!.id
            },
            data: {
                emailConfirmationCode: null,
                emailConfirmed: true
            }
        })

        await logUserAction(request.user!.id, {
            type: 'CONFIRMATION_SEND_EMAIL_CODE'
        })

        return { code: 'Ok' }
    }
})
