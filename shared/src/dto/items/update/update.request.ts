import { z } from 'zod'
import { positiveInt32Schema } from '../../../validation.js'
import { createZodDto } from '../../../zod-dto.js'

const schema = z.object({
    id: positiveInt32Schema,
    description: z.string().optional(),
    price: positiveInt32Schema.optional()
})

export class ItemsUpdateRequest extends createZodDto(schema) {}
