import { ItemsUpdateRequest } from 'artsale-shared'
import { BadRequestError } from '../../../errors/bad-request-error.js'
import { authMiddleware } from '../../../middleware/auth.js'
import { verificationMiddleware } from '../../../middleware/verification.js'
import { db } from '../../../prisma.js'
import { definePostRoute } from '../../../routing.js'
import { logUserAction } from '../../../services/user-action-logging.js'

export const itemsUpdateRoute = definePostRoute({
    path: '/items/update',
    request: ItemsUpdateRequest,
    middleware: [
        authMiddleware,
        verificationMiddleware
    ],
    async handler(data, request) {
        const item = await db.item.findUnique({
            where: {
                id: data.id
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
                id: data.id
            },
            data: {
                description: data.description,
                price: data.price
            }
        })

        await logUserAction(request.user!.id, {
            type: 'ITEMS_UPDATE',
            id: data.id,
            description: data.description,
            price: data.price
        })

        return { code: 'Ok' }
    }
})
