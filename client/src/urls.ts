export function getStaticImageUrl(filename: string, size: 'big' | 'medium' | 'small') {
    if (import.meta.env.DEV) {
        return `http://localhost:8888/static/${size}-${filename}`
    }

    return `/static/${size}-${filename}`
}

export function getApiUrl() {
    if (import.meta.env.DEV || import.meta.env.SSR) {
        return 'http://localhost:8050'
    }

    return '/api'
}

export function getWsUrl() {
    if (import.meta.env.DEV) {
        return 'ws://localhost:8050'
    }

    return `wss://${location.hostname}`
}
