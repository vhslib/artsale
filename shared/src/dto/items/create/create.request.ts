import { z } from 'zod'
import { itemDescriptionSchema, itemNameSchema, positiveInt32Schema } from '../../../validation.js'
import { createZodDto } from '../../../zod-dto.js'

const schema = z.object({
    name: itemNameSchema,
    description: itemDescriptionSchema,
    price: positiveInt32Schema,
    imagesBase64: z.array(z.string()),
    categoryId: positiveInt32Schema,
    properties: z.array(z.tuple([positiveInt32Schema, z.union([z.string(), z.array(z.string())])]))
})

export class ItemsCreateRequest extends createZodDto(schema) {}
