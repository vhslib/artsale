import { resolveNotFoundRoute } from '../../pages/not-found.js'
import type { Middleware } from '../../typings/vue-router.js'

export const adminGuard: Middleware = (context, route) => {
    if (context.store.profileData!.role !== 'ADMIN') {
        return resolveNotFoundRoute(route)
    }
}
