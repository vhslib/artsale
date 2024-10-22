import { z } from 'zod'
import { chatMessageSchema, positiveInt32Schema } from '../../../validation.js'
import { createZodDto } from '../../../zod-dto.js'

const schema = z.object({
    userId: positiveInt32Schema,
    text: chatMessageSchema
})

export class ChatsSendMessageRequest extends createZodDto(schema) {}
