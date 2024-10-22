import { z } from 'zod'
import { passwordSchema } from '../../../validation.js'
import { createZodDto } from '../../../zod-dto.js'

const schema = z.object({
    code: z.string(),
    password: passwordSchema
})

export class PasswordResetSendCodeRequest extends createZodDto(schema) {}
