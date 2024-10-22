import { z } from 'zod'
import { positiveInt32Schema } from '../../../validation.js'
import { createZodDto } from '../../../zod-dto.js'

const schema = z.object({
    query: z.string(),
    categoryId: positiveInt32Schema.optional(),
    properties: z.array(z.tuple([positiveInt32Schema, z.string()])).optional(),
    priceFrom: positiveInt32Schema.optional(),
    priceTo: positiveInt32Schema.optional()
})

export class ItemsSearchRequest extends createZodDto(schema) {}
