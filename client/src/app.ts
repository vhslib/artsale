import App from './App.vue'
import { createPinia } from 'pinia'
import { createSSRApp } from 'vue'
import { APP_CONTEXT, createAppContext } from './context.js'
import { createRouter } from './router/router.js'
import { createApiService } from './services/api.js'
import { createChatService } from './services/chat.js'
import type { StorageService } from './services/storage/base.js'
import { createStore } from './store/store.js'

export function createApp(storage: StorageService) {
    const context = createAppContext()
    context.storage = storage

    const app = createSSRApp(App)
    context.app = app
    app.provide(APP_CONTEXT, context)

    const router = createRouter(context)
    context.router = router
    app.use(router)

    const pinia = createPinia()
    context.pinia = pinia
    app.use(pinia)

    if (!import.meta.env.SSR) {
        pinia.state.value = window.PAYLOAD.pinia
    }

    context.store = createStore(context)
    context.api = createApiService(context)
    context.chatService = createChatService(context)

    return context
}
