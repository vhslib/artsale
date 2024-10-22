import { db } from '../prisma.js'

export async function logUserAction(userId: number, data: UserActionLog) {
    await db.userActionLog.create({
        data: {
            userId,
            data
        }
    })
}

type UserActionLog = UserActionLogTuple[number]

type UserActionLogTuple = [
    {
        type: 'ITEMS_ACTIVATE'
        id: number
    },
    {
        type: 'ITEMS_CREATE'
        id: number
        description: string
        price: number
    },
    {
        type: 'ITEMS_DEACTIVATE'
        id: number
    },
    {
        type: 'ITEMS_DELETE'
        id: number
    },
    {
        type: 'ITEMS_UPDATE'
        id: number
        description?: string
        price?: number
    },
    {
        type: 'CONFIRMATION_GET_EMAIL_CODE'
    },
    {
        type: 'CONFIRMATION_GET_PHONE_CODE'
    },
    {
        type: 'CONFIRMATION_SEND_EMAIL_CODE'
    },
    {
        type: 'CONFIRMATION_SEND_PHONE_CODE'
    },
    {
        type: 'LOGIN'
        ip?: string
    },
    {
        type: 'PROFILE_CHANGE_PASSWORD'
    },
    {
        type: 'PROFILE_CREATE'
        email: string
        phone: string
        firstName: string
        lastName: string
    },
    {
        type: 'PROFILE_UPDATE'
        email?: string
        phone?: string
        firstName?: string
        lastName?: string
    },
    {
        type: 'PASSWORD_RESET_GET_CODE'
    },
    {
        type: 'PASSWORD_RESET_SEND_CODE'
    }
]
