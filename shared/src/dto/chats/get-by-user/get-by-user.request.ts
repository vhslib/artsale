import { z } from 'zod'
import { positiveInt32Schema } from '../../../validation.js'
import { createZodDto } from '../../../zod-dto.js'

const schema = z.object({
    userId: positiveInt32Schema
})

export class ChatsGetByUserRequest extends createZodDto(schema) {}
