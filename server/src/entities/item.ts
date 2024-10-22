import type Prisma from '@prisma/client'

export interface Item extends Prisma.Item {
    itemToProperty: (Prisma.ItemToProperty & { property: Prisma.Property })[]
}
