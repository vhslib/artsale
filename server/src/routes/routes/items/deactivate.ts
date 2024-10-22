import { ItemsDeactivateRequest } from 'artsale-shared'
import { BadRequestError } from '../../../errors/bad-request-error.js'
import { authMiddleware } from '../../../middleware/auth.js'
import { verificationMiddleware } from '../../../middleware/verification.js'
import { db } from '../../../prisma.js'
import { definePostRoute } from '../../../routing.js'
import { logUserAction } from '../../../services/user-action-logging.js'

export const itemsDeactivateRoute = definePostRoute({
    path: '/items/deactivate',
    request: ItemsDeactivateRequest,
    middleware: [
        authMiddleware,
        verificationMiddleware
    ],
    async handler(data, request) {
        const item = await db.item.findUnique({
            where: {
                id: data.itemId
            }
        })

        if (!item) {
            throw new BadRequestError()
        }

        if (item.authorId !== request.user!.id) {
            throw new BadRequestError()
        }

        if (item.status !== 'ACTIVE') {
            throw new BadRequestError()
        }

        await db.item.update({
            where: {
                id: data.itemId
            },
            data: {
                status: 'INACTIVE'
            }
        })

        await logUserAction(request.user!.id, {
            type: 'ITEMS_DEACTIVATE',
            id: data.itemId
        })

        return { code: 'Ok' }
    }
})
