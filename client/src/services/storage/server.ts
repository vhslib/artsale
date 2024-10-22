import type { Request, Response } from 'express'
import type { StorageKeys, StorageService } from './base.js'
import { STORAGE_MAX_AGE_MS } from './base.js'

export function createServerSideStorage(request: Request, response: Response): StorageService {
    function get(key: StorageKeys) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const cookies: Record<string, string> = request.cookies

        return cookies[key]
    }

    function set(key: StorageKeys, value: string) {
        response.cookie(key, value, {
            maxAge: STORAGE_MAX_AGE_MS,
            sameSite: 'lax'
        })
    }

    function remove(key: StorageKeys) {
        response.clearCookie(key)
    }

    return {
        get,
        set,
        remove
    }
}
