import { AdminAddPropertyRequest } from 'artsale-shared'
import { BadRequestError } from '../../../errors/bad-request-error.js'
import { adminMiddleware } from '../../../middleware/admin.js'
import { authMiddleware } from '../../../middleware/auth.js'
import { db } from '../../../prisma.js'
import { definePostRoute } from '../../../routing.js'

export const adminAddPropertyRoute = definePostRoute({
    path: '/admin/add-property',
    request: AdminAddPropertyRequest,
    middleware: [
        authMiddleware,
        adminMiddleware
    ],
    async handler(data) {
        const category = await db.category.findUnique({
            where: {
                id: data.categoryId
            },
            include: {
                properties: true
            }
        })

        if (!category) {
            throw new BadRequestError()
        }

        if (category.properties.some((p) => p.name === data.name)) {
            throw new BadRequestError()
        }

        await db.property.create({
            data: {
                categoryId: data.categoryId,
                name: data.name,
                type: data.type
            }
        })

        return { code: 'Ok' }
    }
})
