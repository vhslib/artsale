import type Prisma from '@prisma/client'
import type { Item } from './item.js'

export interface ChatDialog extends Prisma.ChatDialog {
    creator: Prisma.User
    acceptor: Prisma.User
    item: Item
    messages: Prisma.ChatMessage[]
}
