export type StorageKeys = 'vhslibrary'

export interface StorageService {
    get(key: StorageKeys): string | undefined
    set(key: StorageKeys, value: string): void
    remove(key: StorageKeys): void
}

export const STORAGE_MAX_AGE_DAYS = 365 * 10
export const STORAGE_MAX_AGE_MS = 1000 * 60 * 60 * 24 * STORAGE_MAX_AGE_DAYS
