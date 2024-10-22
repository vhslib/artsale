import { getConfig } from '../config.js'
import { db } from '../prisma.js'
import { verifyJwt } from '../util/promisified.js'

export async function authUser(token: string) {
    const payload = await verifyJwt(token, getConfig().JWT_SECRET)

    const user = await db.user.findUnique({
        where: {
            id: payload.userId
        }
    })

    if (!user || user.password !== payload.passwordHash) {
        return
    }

    return user
}
