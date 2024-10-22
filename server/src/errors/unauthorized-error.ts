import { StatusCode } from 'status-code-enum'
import { HttpError } from './http-error.js'

export class UnauthorizedError extends HttpError {
    public constructor() {
        super(StatusCode.ClientErrorUnauthorized)
    }
}
