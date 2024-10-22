import { authMiddleware } from '../../../middleware/auth.js'
import { defineGetRoute } from '../../../routing.js'
import { transformMyProfileData } from '../../../transformers/user.js'

export const profileMyRoute = defineGetRoute({
    path: '/profile/my',
    middleware: [
        authMiddleware
    ],
    handler(request) {
        return {
            code: 'Ok',
            profileData: transformMyProfileData(request.user!)
        }
    }
})
