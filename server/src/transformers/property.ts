import type { CategoryProperty } from 'artsale-shared'
import type Prisma from '@prisma/client'

export function transformProperty(property: Prisma.Property): CategoryProperty {
    return {
        id: property.id,
        name: property.name,
        type: property.type,
        options: property.options
    }
}
