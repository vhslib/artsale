import { z } from 'zod'
import { createZodDto } from '../../../../zod-dto.js'

const schema = z.object({
    code: z.string()
})

export class ConfirmationEmailSendCodeRequest extends createZodDto(schema) {}
