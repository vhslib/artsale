import type { Category as CategoryTransformed } from 'artsale-shared'
import type { Category } from '../entities/category.js'
import { transformProperty } from './property.js'

export function transformCategory(category: Category): CategoryTransformed {
    return {
        id: category.id,
        name: category.name,
        description: category.description,
        properties: category.properties.map(transformProperty)
    }
}
