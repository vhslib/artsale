import EventEmitter from 'eventemitter3'
import type { Pinia } from 'pinia'
import type { App, InjectionKey } from 'vue'
import { inject } from 'vue'
import type { Router } from 'vue-router'
import type { ApiService } from './services/api.js'
import type { ChatService } from './services/chat.js'
import type { StorageService } from './services/storage/base.js'
import type { Store } from './store/store.js'

export interface AppContext {
    app: App
    router: Router
    pinia: Pinia
    store: Store
    storage: StorageService
    api: ApiService
    chatService: ChatService
    eventBus: EventEmitter<{
        componentLoadingStarted(): void
        componentLoadingFinished(): void
    }>
    pageData: unknown
    title: string
    meta: Map<string, string>
    navigationType: 'server' | 'hydration' | 'client'
    alreadyFetchedStoreData: boolean
}

export function createAppContext(): AppContext {
    return {
        app: undefined as unknown as App,
        router: undefined as unknown as Router,
        pinia: undefined as unknown as Pinia,
        store: undefined as unknown as Store,
        storage: undefined as unknown as StorageService,
        api: undefined as unknown as ApiService,
        chatService: undefined as unknown as ChatService,
        eventBus: new EventEmitter(),
        pageData: import.meta.env.SSR ? undefined : window.PAYLOAD.pageData,
        title: 'ArtSale.ru',
        meta: new Map<string, string>(),
        navigationType: import.meta.env.SSR ? 'server' : 'hydration',
        alreadyFetchedStoreData: false
    }
}

export const APP_CONTEXT = Symbol() as InjectionKey<AppContext>

export function useContext() {
    return inject(APP_CONTEXT)!
}

export function useStore() {
    return useContext().store
}

export function useStorage() {
    return useContext().storage
}

export function useApi() {
    return useContext().api
}

export function useChatService() {
    return useContext().chatService
}

export function usePageData<T>() {
    return useContext().pageData as T
}
