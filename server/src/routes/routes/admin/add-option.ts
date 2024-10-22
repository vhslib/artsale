import { AdminAddOptionRequest } from 'artsale-shared'
import { BadRequestError } from '../../../errors/bad-request-error.js'
import { adminMiddleware } from '../../../middleware/admin.js'
import { authMiddleware } from '../../../middleware/auth.js'
import { db } from '../../../prisma.js'
import { definePostRoute } from '../../../routing.js'

export const adminAddOptionRoute = definePostRoute({
    path: '/admin/add-option',
    request: AdminAddOptionRequest,
    middleware: [
        authMiddleware,
        adminMiddleware
    ],
    async handler(data) {
        const property = await db.property.findUnique({
            where: {
                id: data.propertyId
            }
        })

        if (!property) {
            throw new BadRequestError()
        }

        if (property.options.includes(data.option)) {
            throw new BadRequestError()
        }

        await db.property.update({
            where: {
                id: data.propertyId
            },
            data: {
                options: {
                    push: data.option
                }
            }
        })

        return { code: 'Ok' }
    }
})
