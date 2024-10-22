import { ChatsSendMessageRequest } from 'artsale-shared'
import { BadRequestError } from '../../../errors/bad-request-error.js'
import { authMiddleware } from '../../../middleware/auth.js'
import { verificationMiddleware } from '../../../middleware/verification.js'
import { db } from '../../../prisma.js'
import { definePostRoute } from '../../../routing.js'
import { transformChatMessage } from '../../../transformers/chat-message.js'
import { ws } from '../../../ws.js'

export const chatsSendMessageRoute = definePostRoute({
    path: '/chats/send-message',
    request: ChatsSendMessageRequest,
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
            }
        })

        if (!dialog) {
            throw new BadRequestError()
        }

        const message = await db.chatMessage.create({
            data: {
                senderId: request.user!.id,
                receiverId: data.userId,
                dialogId: dialog.id,
                text: data.text
            }
        })

        const sockets = await ws().fetchSockets()

        for (const socket of sockets) {
            if (socket.data.user.id === data.userId || socket.data.user.id === request.user!.id) {
                socket.emit('chats.new-message', {
                    message: transformChatMessage(message)
                })
            }
        }

        return { code: 'Ok' }
    }
})
