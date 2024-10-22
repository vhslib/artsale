import { shallowRef } from 'vue'
import type { NavigationGuard, RouteLocationNormalized, RouteLocationRaw } from 'vue-router'
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'

type NavigationGuardWithoutNext = (to: RouteLocationNormalized, from: RouteLocationNormalized) => ReturnType<NavigationGuard> | Promise<ReturnType<NavigationGuard>>

export function useSilentPush() {
    const router = useRouter()
    let isPushIgnored = false

    async function silentPush(to: RouteLocationRaw) {
        isPushIgnored = true
        await router.push(to)
        isPushIgnored = false
    }

    function onBeforeRouteExternalUpdate(guard: NavigationGuardWithoutNext) {
        onBeforeRouteUpdate(async (to, from) => {
            if (isPushIgnored) {
                return
            }

            return await guard(to, from)
        })
    }

    function shallowRefUpdatedExternally<T>(getter: (route: RouteLocationNormalized) => T) {
        const value = shallowRef(getter(useRoute()))

        onBeforeRouteExternalUpdate((route) => {
            value.value = getter(route)
        })

        return value
    }

    return {
        silentPush,
        onBeforeRouteExternalUpdate,
        shallowRefUpdatedExternally
    }
}
