import { z } from 'zod'
import { positiveInt32Schema, propertyNameSchema } from '../../../validation.js'
import { createZodDto } from '../../../zod-dto.js'

const schema = z.object({
    categoryId: positiveInt32Schema,
    name: propertyNameSchema,
    type: z.enum(['OPTION', 'MULTI_OPTION'])
})

export class AdminAddPropertyRequest extends createZodDto(schema) {}
