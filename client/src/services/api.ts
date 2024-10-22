import type { ApiPathsGet, ApiPathsPost, ApiSchema, LoginRequest } from 'artsale-shared'
import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { StatusCode } from 'status-code-enum'
import type { AppContext } from '../context.js'
import { getApiUrl } from '../urls.js'

export type ApiService = ReturnType<typeof createApiService>

export function createApiService(context: AppContext) {
    const instance = axios.create({
        baseURL: getApiUrl()
    })

    instance.interceptors.request.use(beforeRequest)
    instance.interceptors.response.use((response) => response, onError)

    function beforeRequest(config: AxiosRequestConfig) {
        const token = context.storage.get('vhslibrary')

        if (token !== undefined) {
            config.headers = config.headers ?? {}
            config.headers['Authorization'] = 'Bearer ' + token
        }

        return config
    }

    function onError(error: unknown) {
        if (isAuthError(error)) {
            context.storage.remove('vhslibrary')
        }

        return Promise.reject(error)
    }

    async function get<Path extends ApiPathsGet>(path: Path) {
        const response = await instance.get<ApiSchema[Path]['response']>(path)
        return response.data
    }

    async function post<Path extends ApiPathsPost>(path: Path, data: ApiSchema[Path]['request']) {
        const response = await instance.post<ApiSchema[Path]['response']>(path, data)
        return response.data
    }

    async function login(data: LoginRequest) {
        const response = await post('/login', data)

        if (response.code === 'Ok') {
            context.storage.set('vhslibrary', response.token)
        }

        return response
    }

    return {
        get,
        post,
        login
    }
}

export function isAuthError(error: unknown) {
    return axios.isAxiosError(error) && error.response?.status === StatusCode.ClientErrorUnauthorized
}
