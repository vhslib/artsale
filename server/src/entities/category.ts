import type Prisma from '@prisma/client'

export interface Category extends Prisma.Category {
    properties: Prisma.Property[]
}
