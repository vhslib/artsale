import { z } from 'zod'
import { passwordSchema } from '../../../validation.js'
import { createZodDto } from '../../../zod-dto.js'

const schema = z.object({
    oldPassword: passwordSchema,
    newPassword: passwordSchema
})

export class ProfileChangePasswordRequest extends createZodDto(schema) {}
