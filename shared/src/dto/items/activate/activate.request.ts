import { z } from 'zod'
import { positiveInt32Schema } from '../../../validation.js'
import { createZodDto } from '../../../zod-dto.js'

const schema = z.object({
    itemId: positiveInt32Schema
})

export class ItemsActivateRequest extends createZodDto(schema) {}
