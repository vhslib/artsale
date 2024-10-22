import type { ChatMessage } from 'artsale-shared'
import type Prisma from '@prisma/client'

export function transformChatMessage(message: Prisma.ChatMessage): ChatMessage {
    return {
        id: message.id,
        date: message.date.getTime(),
        senderId: message.senderId,
        text: message.text
    }
}
