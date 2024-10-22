import cookie from 'js-cookie'
import type { StorageKeys, StorageService } from './base.js'
import { STORAGE_MAX_AGE_DAYS } from './base.js'

export function createClientSideStorage(): StorageService {
    function get(key: StorageKeys) {
        return cookie.get(key)
    }

    function set(key: StorageKeys, value: string) {
        cookie.set(key, value, {
            expires: STORAGE_MAX_AGE_DAYS,
            sameSite: 'lax'
        })
    }

    function remove(key: StorageKeys) {
        cookie.remove(key)
    }

    return {
        get,
        set,
        remove
    }
}
