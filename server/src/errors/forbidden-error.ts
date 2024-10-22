import { StatusCode } from 'status-code-enum'
import { HttpError } from './http-error.js'

export class ForbiddenError extends HttpError {
    public constructor() {
        super(StatusCode.ClientErrorForbidden)
    }
}
