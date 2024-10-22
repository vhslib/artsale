import { ChatsGetByUserRequest } from 'artsale-shared'
import { authMiddleware } from '../../../middleware/auth.js'
import { verificationMiddleware } from '../../../middleware/verification.js'
import { db } from '../../../prisma.js'
import { definePostRoute } from '../../../routing.js'
import { transformChatDialog } from '../../../transformers/chat-dialog.js'

export const chatsGetByUserRoute = definePostRoute({
    path: '/chats/get-by-user',
    request: ChatsGetByUserRequest,
    middleware: [
        authMiddleware,
        verificationMiddleware
    ],
    async handler(data, request) {
        const dialog = await db.chatDialog.findFirst({
            where: {
                OR: [
                    {
                        creatorId: request.user!.id,
                        acceptorId: data.userId
                    },
                    {
                        creatorId: data.userId,
                        acceptorId: request.user!.id
                    }
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

        if (!dialog) {
            return { code: 'NotFound' }
        }

        return {
            code: 'Ok',
            dialog: transformChatDialog(dialog, request.user!.id)
        }
    }
})
