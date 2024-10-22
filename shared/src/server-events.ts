import type { ChatsNewMessageServerEvent } from './server-events/chats/new-message.js'

export interface ServerEvents {
    'chats.new-message': (event: ChatsNewMessageServerEvent) => void
}
