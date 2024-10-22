import { z } from 'zod'
import { emailSchema, firstNameSchema, lastNameSchema, phoneSchema } from '../../../validation.js'
import { createZodDto } from '../../../zod-dto.js'

const schema = z.object({
    email: emailSchema.optional(),
    phone: phoneSchema.optional(),
    firstName: firstNameSchema.optional(),
    lastName: lastNameSchema.optional()
})

export class ProfileUpdateRequest extends createZodDto(schema) {}
