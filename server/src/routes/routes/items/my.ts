import { authMiddleware } from '../../../middleware/auth.js'
import { verificationMiddleware } from '../../../middleware/verification.js'
import { db } from '../../../prisma.js'
import { defineGetRoute } from '../../../routing.js'
import { transformItem } from '../../../transformers/item.js'

export const itemsMyRoute = defineGetRoute({
    path: '/items/my',
    middleware: [
        authMiddleware,
        verificationMiddleware
    ],
    async handler(request) {
        const items = await db.item.findMany({
            where: {
                authorId: request.user!.id,
                status: {
                    in: ['ACTIVE', 'INACTIVE']
                }
            },
            include: {
                itemToProperty: {
                    include: {
                        property: true
                    }
                }
            },
            orderBy: {
                datePublished: 'desc'
            }
        })

        return {
            code: 'Ok',
            items: items.map(transformItem)
        }
    }
})
