import type { Request, Response } from 'express'
import { StatusCode } from 'status-code-enum'

export function notFoundHandler(_request: Request, response: Response) {
    response.status(StatusCode.ClientErrorNotFound)

    response.json({
        status: StatusCode.ClientErrorNotFound
    })
}
