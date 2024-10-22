import { ConfirmationPhoneSendCodeRequest } from 'artsale-shared'
import { BadRequestError } from '../../../../errors/bad-request-error.js'
import { authMiddleware } from '../../../../middleware/auth.js'
import { db } from '../../../../prisma.js'
import { definePostRoute } from '../../../../routing.js'
import { logUserAction } from '../../../../services/user-action-logging.js'

export const confirmationPhoneSendCodeRoute = definePostRoute({
    path: '/confirmation/phone/send-code',
    request: ConfirmationPhoneSendCodeRequest,
    middleware: [
        authMiddleware
    ],
    async handler(data, request) {
        if (request.user!.phoneConfirmed) {
            throw new BadRequestError()
        }

        if (data.code !== request.user!.phoneConfirmationCode) {
            return { code: 'InvalidCode' }
        }

        await db.user.update({
            where: {
                id: request.user!.id
            },
            data: {
                phoneConfirmationCode: null,
                phoneConfirmed: true
            }
        })

        await logUserAction(request.user!.id, {
            type: 'CONFIRMATION_SEND_PHONE_CODE'
        })

        return { code: 'Ok' }
    }
})
