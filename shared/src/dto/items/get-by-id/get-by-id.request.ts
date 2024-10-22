import { z } from 'zod'
import { positiveInt32Schema } from '../../../validation.js'
import { createZodDto } from '../../../zod-dto.js'

const schema = z.object({
    id: positiveInt32Schema
})

export class ItemsGetByIdRequest extends createZodDto(schema) {}
