import type { StatusCode } from 'status-code-enum'

export class HttpError extends Error {
    public constructor(public statusCode: StatusCode) {
        super()
    }
}
