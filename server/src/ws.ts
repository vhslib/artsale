import type { ServerEvents } from 'artsale-shared'
import type http from 'http'
import type { Socket as SocketGeneric } from 'socket.io'
import { Server } from 'socket.io'
import type Prisma from '@prisma/client'
import { getConfig } from './config.js'
import { authUser } from './services/auth.js'

export type Socket = SocketGeneric<object, ServerEvents, object, { user: Prisma.User }>

let io: Server<object, ServerEvents, object, { user: Prisma.User }>

export function ws() {
    return io
}

export function initWs(server: http.Server) {
    if (getConfig().NODE_ENV === 'development') {
        io = new Server(server, {
            cors: {
                origin: '*'
            },
            transports: ['websocket']
        })
    }
    else {
        io = new Server(server, {
            transports: ['websocket']
        })
    }

    io.on('connection', async (socket) => {
        const token: unknown = socket.handshake.auth['token']

        if (typeof token !== 'string') {
            socket.disconnect(true)
            return
        }

        const user = await authUser(token)

        if (!user) {
            socket.disconnect(true)
            return
        }

        socket.data.user = user
    })

    console.log(`Created WebSocket server at ${io.path()}`)
}
