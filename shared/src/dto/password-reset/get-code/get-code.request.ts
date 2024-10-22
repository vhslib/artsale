import { z } from 'zod'
import { emailSchema } from '../../../validation.js'
import { createZodDto } from '../../../zod-dto.js'

const schema = z.object({
    email: emailSchema
})

export class PasswordResetGetCodeRequest extends createZodDto(schema) {}
