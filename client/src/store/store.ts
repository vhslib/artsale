import { defineStore } from 'pinia'
import type { AppContext } from '../context.js'
import { useCategoriesStore } from './categories.js'
import { useProfileDataStore } from './profile-data.js'

export function createStore(context: AppContext) {
    const useStore = defineStore('default', () => {
        return {
            ...useProfileDataStore(context),
            ...useCategoriesStore(context)
        }
    })

    return useStore(context.pinia)
}

export type Store = ReturnType<typeof createStore>
