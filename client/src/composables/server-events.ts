import type { ServerEvents } from 'artsale-shared'
import type { Socket } from 'socket.io-client'
import { io } from 'socket.io-client'
import { onUnmounted } from 'vue'
import { useStorage } from '../context.js'
import { getWsUrl } from '../urls.js'

let usersCount = 0

export function onServerEvent<Event extends keyof ServerEvents>(event: Event, callback: ServerEvents[Event]) {
    if (import.meta.env.SSR) {
        return
    }

    usersCount++

    const storage = useStorage()

    const socket: Socket<ServerEvents, object> = io(getWsUrl(), {
        transports: ['websocket'],
        auth: {
            token: storage.get('vhslibrary')
        }
    })

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    socket.on(event, callback as any)

    onUnmounted(() => {
        usersCount--

        if (usersCount === 0) {
            socket.disconnect()
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            socket.off(event, callback as any)
        }
    })
}
