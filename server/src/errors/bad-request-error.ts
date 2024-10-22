import { StatusCode } from 'status-code-enum'
import { HttpError } from './http-error.js'

export class BadRequestError extends HttpError {
    public constructor() {
        super(StatusCode.ClientErrorBadRequest)
    }
}
