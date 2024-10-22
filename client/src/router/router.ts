import { createMemoryHistory, createRouter as _createRouter, createWebHistory } from 'vue-router'
import type { AppContext } from '../context.js'
import { appRoute } from '../pages/app.js'
import { dummyRoute } from '../pages/dummy.js'
import { notFoundRoute, resolveNotFoundRoute } from '../pages/not-found.js'
import { isPageReload } from '../util/is-page-reload.js'
import { stringToNumberStrict } from '../util/string-to-number-strict.js'

export function createRouter(context: AppContext) {
    const router = _createRouter({
        history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
        sensitive: true,
        routes: [
            dummyRoute,
            appRoute,
            notFoundRoute
        ],
        scrollBehavior(to, from, savedPosition) {
            const isReload = context.navigationType === 'hydration' && isPageReload()

            if (context.navigationType === 'hydration') {
                context.navigationType = 'client'
            }

            if (isReload) {
                const top = stringToNumberStrict(localStorage.getItem('top') ?? undefined)
                const left = stringToNumberStrict(localStorage.getItem('left') ?? undefined)

                if (top !== undefined && left !== undefined) {
                    return { top, left, behavior: 'smooth' }
                }
            }

            if (savedPosition) {
                return savedPosition
            }

            if (to.name === from.name) {
                return
            }

            return { top: 0, left: 0 }
        }
    })

    // If server rendered NotFound, redirect to it explicitly
    router.beforeEach((route) => {
        if (context.navigationType === 'hydration') {
            if (window.PAYLOAD.isNotFound && route.name !== 'NotFound') {
                return resolveNotFoundRoute(route)
            }
        }
    })

    // Start loader
    router.beforeEach(() => {
        context.eventBus.emit('componentLoadingStarted')
    })

    // Middleware
    router.beforeEach(async (route) => {
        for (const { meta } of route.matched) {
            if (!meta.middleware) {
                continue
            }

            for (const middleware of meta.middleware) {
                const result = await middleware(context, route)

                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                if (result !== undefined) {
                    return result
                }
            }
        }
    })

    // Page data
    router.beforeEach(async (to, from) => {
        if (context.navigationType === 'hydration' || !to.meta.pageData || to.name === from.name) {
            return
        }

        const result = await to.meta.pageData(context, to)

        if ('redirect' in result) {
            return result.redirect
        }

        context.pageData = result.data
    })

    // Stop loader
    router.beforeResolve(() => {
        context.eventBus.emit('componentLoadingFinished')
    })

    // After middleware
    router.afterEach(async (route) => {
        for (const { meta } of route.matched) {
            if (!meta.after) {
                continue
            }

            for (const middleware of meta.after) {
                await middleware(context)
            }
        }
    })

    return router
}
