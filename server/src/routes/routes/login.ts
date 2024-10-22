import { LoginRequest } from 'artsale-shared'
import bcrypt from 'bcrypt'
import { getClientIp } from 'request-ip'
import { getConfig } from '../../config.js'
import type { JwtPayload } from '../../entities/jwt-payload.js'
import { db } from '../../prisma.js'
import { definePostRoute } from '../../routing.js'
import { logUserAction } from '../../services/user-action-logging.js'
import { signJwt } from '../../util/promisified.js'

export const loginRoute = definePostRoute({
    path: '/login',
    request: LoginRequest,
    async handler(data, request) {
        const user = await db.user.findFirst({
            where: {
                OR: [
                    { email: data.login },
                    { phone: data.login }
                ]
            }
        })

        if (!user) {
            return { code: 'WrongLoginOrPassword' }
        }

        const passwordsMatch = await bcrypt.compare(data.password, user.password)

        if (!passwordsMatch) {
            return { code: 'WrongLoginOrPassword' }
        }

        const payload: JwtPayload = {
            userId: user.id,
            passwordHash: user.password
        }

        const token = await signJwt(payload, getConfig().JWT_SECRET)

        await logUserAction(user.id, {
            type: 'LOGIN',
            ip: getClientIp(request) ?? undefined
        })

        return {
            code: 'Ok',
            token
        }
    }
})
