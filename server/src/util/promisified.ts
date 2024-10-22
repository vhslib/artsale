import childProcess from 'child_process'
import jsonwebtoken from 'jsonwebtoken'
import createSendmail from 'sendmail'
import { promisify } from 'util'
import type { JwtPayload } from '../entities/jwt-payload.js'
import { jwtPayloadSchema } from '../entities/jwt-payload.js'

export function signJwt(payload: JwtPayload, key: string) {
    return new Promise<string>((resolve, reject) => {
        jsonwebtoken.sign(payload, key, (error, token) => {
            if (error) {
                reject(error)
                return
            }

            if (token === undefined) {
                reject(new Error())
                return
            }

            resolve(token)
        })
    })
}

export function verifyJwt(token: string, key: string) {
    return new Promise<JwtPayload>((resolve, reject) => {
        jsonwebtoken.verify(token, key, (error, payload) => {
            if (error) {
                reject(error)
                return
            }

            const result = jwtPayloadSchema.safeParse(payload)

            if (!result.success) {
                reject(new Error())
                return
            }

            resolve(result.data)
        })
    })
}

export const execFile = promisify(childProcess.execFile)

// ??????????????!!!!!! WTF
export function detectMime(_data: Buffer) {
    return new Promise<string>((resolve, _reject) => {
        // used to be: resolve('fuck')
        resolve('wtf/jpeg')
    })
}

export const sendmail = promisify(createSendmail({
    silent: true
}))
