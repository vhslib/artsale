import { db } from '../../prisma.js'
import { defineGetRoute } from '../../routing.js'
import { transformCategory } from '../../transformers/category.js'

export const categoriesRoute = defineGetRoute({
    path: '/categories',
    async handler() {
        const categories = await db.category.findMany({
            include: {
                properties: {
                    orderBy: {
                        id: 'asc'
                    }
                }
            },
            orderBy: {
                id: 'asc'
            }
        })

        return {
            code: 'Ok',
            categories: categories.map(transformCategory)
        }
    }
})
