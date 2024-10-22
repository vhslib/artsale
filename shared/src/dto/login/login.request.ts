import { z } from 'zod'
import { emailSchema, passwordSchema, phoneSchema } from '../../validation.js'
import { createZodDto } from '../../zod-dto.js'

const schema = z.object({
    login: z.union([
        emailSchema,
        phoneSchema
    ]),
    password: passwordSchema
})

export class LoginRequest extends createZodDto(schema) {}
