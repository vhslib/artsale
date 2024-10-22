import type { ChatMessage } from '../../entities/chat-message.js'

export interface ChatsNewMessageServerEvent {
    message: ChatMessage
}
