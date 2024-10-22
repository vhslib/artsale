import type { RouteLocationNormalized, RouteLocationRaw } from 'vue-router'
import type { AppContext } from '../context.js'

type MiddlewareReturn = void | RouteLocationRaw

export interface Middleware {
    (context: AppContext, route: RouteLocationNormalized): MiddlewareReturn | Promise<MiddlewareReturn>
}

type PageDataReturn =
    | { data: unknown }
    | { redirect: RouteLocationRaw }

interface MiddlewareAfter {
    (context: AppContext): void | Promise<void>
}

declare module 'vue-router' {
    interface RouteMeta {
        middleware?: Middleware[]
        pageData?(context: AppContext, route: RouteLocationNormalized): Promise<PageDataReturn>
        after?: MiddlewareAfter[]
    }
}
