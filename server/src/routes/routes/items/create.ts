import { getMultiOptionPropertySchema, getOptionPropertySchema, ItemsCreateRequest } from 'artsale-shared'
import { BadRequestError } from '../../../errors/bad-request-error.js'
import { authMiddleware } from '../../../middleware/auth.js'
import { verificationMiddleware } from '../../../middleware/verification.js'
import { db } from '../../../prisma.js'
import { definePostRoute } from '../../../routing.js'
import { storeImages } from '../../../services/images.js'
import { logUserAction } from '../../../services/user-action-logging.js'

export const itemsCreateRoute = definePostRoute({
    path: '/items/create',
    request: ItemsCreateRequest,
    middleware: [
        authMiddleware,
        verificationMiddleware
    ],
    async handler(data, request) {
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

        const isValidPropertyList = data.properties.every(([id, value]) => {
            const property = category.properties.find((p) => p.id === id)

            if (!property) {
                return false
            }

            const getSchema = () => {
                switch (property.type) {
                    case 'OPTION': return getOptionPropertySchema(property.options)
                    case 'MULTI_OPTION': return getMultiOptionPropertySchema(property.options)
                }
            }

            return getSchema().safeParse(value).success
        })

        if (!isValidPropertyList) {
            throw new BadRequestError()
        }

        const imageNames = await storeImages(data.imagesBase64)

        if (!imageNames) {
            return { code: 'InvalidImage' }
        }

        const item = await db.item.create({
            data: {
                categoryId: data.categoryId,
                name: data.name,
                description: data.description,
                price: data.price,
                authorId: request.user!.id,
                images: imageNames,
                itemToProperty: {
                    createMany: {
                        data: data.properties.map(([id, value]) => {
                            return {
                                propertyId: id,
                                value
                            }
                        })
                    }
                }
            }
        })

        await logUserAction(request.user!.id, {
            type: 'ITEMS_CREATE',
            id: item.id,
            description: data.description,
            price: data.price
        })

        return { code: 'Ok' }
    }
})
