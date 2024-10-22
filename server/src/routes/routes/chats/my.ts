import { authMiddleware } from '../../../middleware/auth.js'
import { verificationMiddleware } from '../../../middleware/verification.js'
import { db } from '../../../prisma.js'
import { defineGetRoute } from '../../../routing.js'
import { transformChatDialog } from '../../../transformers/chat-dialog.js'

export const chatsMyRoute = defineGetRoute({
    path: '/chats/my',
    middleware: [
        authMiddleware,
        verificationMiddleware
    ],
    async handler(request) {
        const dialogs = await db.chatDialog.findMany({
            where: {
                OR: [
                    { creatorId: request.user!.id },
                    { acceptorId: request.user!.id }
                ]
            },
            include: {
                creator: true,
                acceptor: true,
                messages: true,
                item: {
                    include: {
                        itemToProperty: {
                            include: {
                                property: true
                            }
                        }
                    }
                }
            }
        })

        dialogs.sort((a, b) => {
            const lastMessageInA = a.messages[a.messages.length - 1]
            const lastMessageDateInA = lastMessageInA?.date ?? a.dateCreated

            const lastMessageInB = b.messages[b.messages.length - 1]
            const lastMessageDateInB = lastMessageInB?.date ?? b.dateCreated

            return lastMessageDateInB.getTime() - lastMessageDateInA.getTime()
        })

        return {
            code: 'Ok',
            dialogs: dialogs.map((dialog) => transformChatDialog(dialog, request.user!.id))
        }
    }
})
