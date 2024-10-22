import type { MyProfileData, OtherUserProfileData } from 'artsale-shared'
import type Prisma from '@prisma/client'

export function transformMyProfileData(user: Prisma.User): MyProfileData {
    return {
        id: user.id,
        email: user.email,
        emailConfirmed: user.emailConfirmed,
        phone: user.phone,
        phoneConfirmed: user.phoneConfirmed,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
    }
}

export function transformOtherUserProfileData(user: Prisma.User): OtherUserProfileData {
    return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName
    }
}
