import type { CategoryProperty } from './category-property.js'

export interface Category {
    id: number
    name: string
    description: string
    properties: CategoryProperty[]
}
