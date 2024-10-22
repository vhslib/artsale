import { z } from 'zod'
import { positiveInt32Schema } from '../../../validation.js'
import { createZodDto } from '../../../zod-dto.js'

const schema = z.object({
    authorId: positiveInt32Schema
})

export class ItemsGetByAuthorRequest extends createZodDto(schema) {}
