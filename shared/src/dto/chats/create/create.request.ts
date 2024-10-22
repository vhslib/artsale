import { z } from 'zod'
import { chatMessageSchema, positiveInt32Schema } from '../../../validation.js'
import { createZodDto } from '../../../zod-dto.js'

const schema = z.object({
    itemId: positiveInt32Schema,
    message: chatMessageSchema
})

export class ChatsCreateRequest extends createZodDto(schema) {}
