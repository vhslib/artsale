import { ChatsCreateRequest } from 'artsale-shared'
import { BadRequestError } from '../../../errors/bad-request-error.js'
import { authMiddleware } from '../../../middleware/auth.js'
import { verificationMiddleware } from '../../../middleware/verification.js'
import { db } from '../../../prisma.js'
import { definePostRoute } from '../../../routing.js'

export const chatsCreateRoute = definePostRoute({
    path: '/chats/create',
    request: ChatsCreateRequest,
    middleware: [
        authMiddleware,
        verificationMiddleware
    ],
    async handler(data, request) {
        const item = await db.item.findUnique({
            where: {
                id: data.itemId
            },
            include: {
                author: {
                    include: {
                        createdDialogs: true,
                        acceptedDialogs: true
                    }
                }
            }
        })

        if (!item) {
            throw new BadRequestError()
        }

        if (item.author.createdDialogs.some((d) => d.acceptorId === request.user!.id)) {
            throw new BadRequestError()
        }

        if (item.author.acceptedDialogs.some((d) => d.creatorId === request.user!.id)) {
            throw new BadRequestError()
        }

        await db.chatDialog.create({
            data: {
                creatorId: request.user!.id,
                acceptorId: item.author.id,
                creatorMessage: data.message,
                itemId: data.itemId
            }
        })

        return { code: 'Ok' }
    }
})
