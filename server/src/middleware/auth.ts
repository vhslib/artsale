import type { Request } from 'express'
import { UnauthorizedError } from '../errors/unauthorized-error.js'
import { authUser } from '../services/auth.js'

export async function authMiddleware(request: Request) {
    const header = request.header('Authorization')

    if (header === undefined) {
        throw new UnauthorizedError()
    }

    const token = extractToken(header)

    if (token === undefined) {
        throw new UnauthorizedError()
    }

    const user = await authUser(token)

    if (!user) {
        throw new UnauthorizedError()
    }

    request.user = user
}

function extractToken(header: string) {
    const regex = /Bearer (.+)/
    const matches = regex.exec(header)

    if (matches) {
        return matches[1]
    }
}
