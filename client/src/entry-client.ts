import { createApp } from './app.js'
import { createClientSideStorage } from './services/storage/client.js'

// Save scroll position when leaving the page
// to reset it later if it is a reload
window.addEventListener('beforeunload', () => {
    localStorage.setItem('top', window.scrollY.toString())
    localStorage.setItem('left', window.scrollX.toString())
})

// If redirected on server, replace the url
history.replaceState({}, '', window.PAYLOAD.url)

const { app, router } = createApp(createClientSideStorage())
void router.isReady().then(() => app.mount('#app'))
