import { z } from 'zod'
import { optionSchema, positiveInt32Schema } from '../../../validation.js'
import { createZodDto } from '../../../zod-dto.js'

const schema = z.object({
    propertyId: positiveInt32Schema,
    option: optionSchema
})

export class AdminAddOptionRequest extends createZodDto(schema) {}
