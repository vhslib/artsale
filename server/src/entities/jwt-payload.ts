import { positiveInt32Schema } from 'artsale-shared'
import { z } from 'zod'

export const jwtPayloadSchema = z.object({
    userId: positiveInt32Schema,
    passwordHash: z.string()
})

export type JwtPayload = z.infer<typeof jwtPayloadSchema>
