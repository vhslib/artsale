import type { Request, Response } from 'express'
import { StatusCode } from 'status-code-enum'
import { HttpError } from './errors/http-error.js'

export function errorHandler(error: unknown, _request: Request, response: Response) {
    if (error instanceof HttpError) {
        response.status(error.statusCode)
        response.json({
            status: error.statusCode
        })

        return
    }

    console.error(error)

    response.status(StatusCode.ServerErrorInternal)
    response.json({
        status: StatusCode.ServerErrorInternal
    })
}
