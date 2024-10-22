import { z } from 'zod'
import { emailSchema, firstNameSchema, lastNameSchema, passwordSchema, phoneSchema } from '../../../validation.js'
import { createZodDto } from '../../../zod-dto.js'

const schema = z.object({
    email: emailSchema,
    phone: phoneSchema,
    password: passwordSchema,
    firstName: firstNameSchema,
    lastName: lastNameSchema
})

export class ProfileCreateRequest extends createZodDto(schema) {}
