import { ItemsGetByIdRequest } from 'artsale-shared'
import { db } from '../../../prisma.js'
import { definePostRoute } from '../../../routing.js'
import { transformItem } from '../../../transformers/item.js'
import { transformOtherUserProfileData } from '../../../transformers/user.js'

export const itemsGetByIdRoute = definePostRoute({
    path: '/items/get-by-id',
    request: ItemsGetByIdRequest,
    async handler(data) {
        const item = await db.item.findUnique({
            where: {
                id: data.id
            },
            include: {
                itemToProperty: {
                    include: {
                        property: true
                    }
                },

                author: true
            }
        })

        if (!item || item.status !== 'ACTIVE') {
            return { code: 'NotFound' }
        }

        return {
            code: 'Ok',
            author: transformOtherUserProfileData(item.author),
            item: transformItem(item)
        }
    }
})
