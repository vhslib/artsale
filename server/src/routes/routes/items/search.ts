import { getOptionPropertySchema, ItemsSearchRequest } from 'artsale-shared'
import type Prisma from '@prisma/client'
import type { Category } from '../../../entities/category.js'
import { BadRequestError } from '../../../errors/bad-request-error.js'
import { db } from '../../../prisma.js'
import { definePostRoute } from '../../../routing.js'
import { transformItem } from '../../../transformers/item.js'
import { bind, bindAsync } from '../../../util/bind.js'

export const itemsSearchRoute = definePostRoute({
    path: '/items/search',
    request: ItemsSearchRequest,
    async handler(data) {
        if (data.categoryId === undefined && data.properties) {
            throw new BadRequestError()
        }

        const category = await bindAsync(data.categoryId, async (id) => {
            return await db.category.findUnique({
                where: {
                    id
                },
                include: {
                    properties: true
                }
            }) ?? undefined
        })

        if (data.categoryId !== undefined && !category) {
            throw new BadRequestError()
        }

        if (data.properties) {
            const isValidPropertyList = data.properties.every(([id, value]) => {
                const property = category!.properties.find((p) => p.id === id)

                if (!property) {
                    return false
                }

                const getSchema = () => {
                    switch (property.type) {
                        case 'OPTION': return getOptionPropertySchema(property.options)
                        case 'MULTI_OPTION': return getOptionPropertySchema(property.options)
                    }
                }

                return getSchema().safeParse(value).success
            })

            if (!isValidPropertyList) {
                throw new BadRequestError()
            }
        }

        const items = await search({
            query: data.query,
            category,
            properties: data.properties,
            priceFrom: data.priceFrom,
            priceTo: data.priceTo
        })

        return {
            code: 'Ok',
            items: items.map(transformItem)
        }
    }
})

interface SearchData {
    query: string
    category?: Category
    properties?: [number, string][]
    priceFrom?: number
    priceTo?: number
}

async function search(data: SearchData) {
    const items = await db.item.findMany({
        where: {
            OR: [
                {
                    name: {
                        contains: data.query,
                        mode: 'insensitive'
                    }
                },
                {
                    description: {
                        contains: data.query,
                        mode: 'insensitive'
                    }
                }
            ],
            categoryId: data.category?.id,
            price: {
                gte: data.priceFrom,
                lte: data.priceTo
            },
            itemToProperty: bind(data.properties, (p) => itemToPropertyConstraint(data.category!, p)),
            status: 'ACTIVE'
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

    return items
}

function itemToPropertyConstraint(category: Category, properties: [number, string][]): Prisma.Prisma.ItemToPropertyListRelationFilter | undefined {
    const propertiesMap = new Map(properties)

    return {
        every: {
            OR: category.properties.map((p) => {
                const value = propertiesMap.get(p.id)

                if (value === undefined) {
                    return {
                        propertyId: p.id
                    }
                }

                if (p.type === 'MULTI_OPTION') {
                    return {
                        propertyId: p.id,
                        value: {
                            array_contains: value
                        }
                    }
                }

                return {
                    propertyId: p.id,
                    value: {
                        equals: value
                    }
                }
            })
        }
    }
}
