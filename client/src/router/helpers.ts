import type { RouteLocationNormalized } from 'vue-router'

export function getRouteParam(route: RouteLocationNormalized, key: string) {
    const param = route.params[key] as string | undefined
    return param === '' ? undefined : param
}

export function getRouteParams(route: RouteLocationNormalized, key: string) {
    const params = route.params[key]
    return (params ?? []) as string[]
}

export function getRouteQuery(route: RouteLocationNormalized, key: string) {
    const query = (route.query[key] ?? undefined) as string | undefined
    return query === '' ? undefined : query
}
