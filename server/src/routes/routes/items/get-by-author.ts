import { ItemsGetByAuthorRequest } from 'artsale-shared'
import { db } from '../../../prisma.js'
import { definePostRoute } from '../../../routing.js'
import { transformItem } from '../../../transformers/item.js'
import { transformOtherUserProfileData } from '../../../transformers/user.js'

export const itemsGetByAuthorRoute = definePostRoute({
    path: '/items/get-by-author',
    request: ItemsGetByAuthorRequest,
    async handler(data) {
        const author = await db.user.findUnique({
            where: {
                id: data.authorId
            },
            include: {
                items: {
                    where: {
                        status: 'ACTIVE'
                    },
                    include: {
                        itemToProperty: {
                            include: {
                                property: true
                            }
                        }
                    }
                }
            }
        })

        if (!author) {
            return { code: 'NotFound' }
        }

        return {
            code: 'Ok',
            author: transformOtherUserProfileData(author),
            items: author.items.map(transformItem)
        }
    }
})
