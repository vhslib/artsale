import type { ApiPathsGet, ApiPathsPost, ApiSchema, GenericResponse, ZodDtoStatic } from 'artsale-shared'
import type { Application, Request } from 'express'
import { errorHandler } from './error-handler.js'
import { BadRequestError } from './errors/bad-request-error.js'

type Middleware = (request: Request) => void | Promise<void>

interface GetRouteGeneric {
    method: 'get'
    path: string
    middleware?: Middleware[]
    handler(request: Request): GenericResponse | Promise<GenericResponse>
}

export interface GetRoute<Path extends ApiPathsGet> extends GetRouteGeneric {
    path: Path
    handler(request: Request): ApiSchema[Path]['response'] | Promise<ApiSchema[Path]['response']>
}

export function defineGetRoute<Path extends ApiPathsGet>(route: Omit<GetRoute<Path>, 'method'>): GetRoute<Path> {
    return {
        ...route,
        method: 'get'
    }
}

interface PostRouteGeneric {
    method: 'post'
    path: string
    middleware?: Middleware[]
    request: ZodDtoStatic<object>
    handler(data: object, request: Request): GenericResponse | Promise<GenericResponse>
}

export interface PostRoute<Path extends ApiPathsPost> extends PostRouteGeneric {
    path: Path
    request: ZodDtoStatic<ApiSchema[Path]['request']>
    handler(data: ApiSchema[Path]['request'], request: Request): ApiSchema[Path]['response'] | Promise<ApiSchema[Path]['response']>
}

export function definePostRoute<Path extends ApiPathsPost>(route: Omit<PostRoute<Path>, 'method'>): PostRoute<Path> {
    return {
        ...route,
        method: 'post'
    }
}

export type Route = GetRouteGeneric | PostRouteGeneric

export function applyRoutes(app: Application, routes: Route[]) {
    for (const route of routes) {
        console.log(`Registering ${route.method.toUpperCase()} ${route.path}`)

        app[route.method](route.path, async (request, response) => {
            try {
                if (route.middleware) {
                    for (const middleware of route.middleware) {
                        await middleware(request)
                    }
                }

                if (route.method === 'post') {
                    if (!route.request.schema.safeParse(request.body).success) {
                        throw new BadRequestError()
                    }
                }

                const result = route.method === 'get'
                    ? route.handler(request)
                    : route.handler(request.body as object, request)

                response.json(await result)
            }
            catch (e) {
                errorHandler(e, request, response)
            }
        })
    }
}
