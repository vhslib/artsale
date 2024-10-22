import type { Request } from 'express'
import { ForbiddenError } from '../errors/forbidden-error.js'

export function verificationMiddleware(request: Request) {
    if (!request.user!.emailConfirmed || !request.user!.phoneConfirmed) {
        throw new ForbiddenError()
    }
}
