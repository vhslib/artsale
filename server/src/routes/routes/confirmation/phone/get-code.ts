import { BadRequestError } from '../../../../errors/bad-request-error.js'
import { authMiddleware } from '../../../../middleware/auth.js'
import { db } from '../../../../prisma.js'
import { defineGetRoute } from '../../../../routing.js'
import { logUserAction } from '../../../../services/user-action-logging.js'
import { createSuperRandomId } from '../../../../util/super-random-id.js'

export const confirmationPhoneGetCodeRoute = defineGetRoute({
    path: '/confirmation/phone/get-code',
    middleware: [
        authMiddleware
    ],
    async handler(request) {
        if (request.user!.phoneConfirmed) {
            throw new BadRequestError()
        }

        const code = createSuperRandomId(15)
        console.log('PHONE CONFIRMATION CODE:', code)

        await db.user.update({
            where: {
                id: request.user!.id
            },
            data: {
                phoneConfirmationCode: code
            }
        })

        await logUserAction(request.user!.id, {
            type: 'CONFIRMATION_GET_PHONE_CODE'
        })

        return { code: 'Ok' }
    }
})
