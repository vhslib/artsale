declare global {
    interface Window {
        PAYLOAD: {
            url: string
            isNotFound: boolean
            pinia: Record<string, Record<string, any>>
            pageData: unknown
        }
    }
}

export {}
