import type { Request } from 'express'
import { ForbiddenError } from '../errors/forbidden-error.js'

export function adminMiddleware(request: Request) {
    if (request.user!.role !== 'ADMIN') {
        throw new ForbiddenError()
    }
}
