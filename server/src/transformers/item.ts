import type { Item as ItemTransformed } from 'artsale-shared'
import { iterate } from 'iterare'
import type { Item } from '../entities/item.js'
import { tuple } from '../util/tuple.js'

export function transformItem(item: Item): ItemTransformed {
    return {
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        status: item.status,
        categoryId: item.categoryId,
        images: item.images,
        datePublished: item.datePublished.getTime(),
        authorId: item.authorId,
        properties: iterate(item.itemToProperty)
            .map(({ property, value }) => tuple(property.id, value as string | string[]))
            .filter(([_, value]) => !Array.isArray(value) || value.length !== 0)
            .toArray()
    }
}
