import cookieParser from 'cookie-parser'
import type { Request, Response } from 'express'
import express from 'express'
import serveStaticGzip from 'express-static-gzip'
import { readFile } from 'fs/promises'
import path from 'path'
import serveStatic from 'serve-static'
import { fileURLToPath } from 'url'
import { compileTemplate, handleRequest } from './entry-server.js'
import { jsonParse } from './util/json-parse.js'

function resolvePath(p: string) {
    return path.resolve(path.dirname(fileURLToPath(import.meta.url)), p)
}

const ONE_YEAR_IN_MS = 1000 * 60 * 60 * 24 * 365

async function asyncWrap() {
    const template = compileTemplate(await readFile(resolvePath('../client/index.html'), 'utf-8'))
    const manifest = jsonParse<Record<string, string[]>>(await readFile(resolvePath('../client/ssr-manifest.json'), 'utf-8'))

    async function ssrHandler(request: Request, response: Response) {
        try {
            await handleRequest({
                url: request.originalUrl,
                template,
                request,
                response,
                manifest
            })
        }
        catch (e) {
            if (e instanceof Error) {
                console.error(e.stack)

                response.status(500)
                response.end('An error occured.')
            }
        }
    }

    const app = express()

    const staticFilesMiddleware = serveStatic(resolvePath('../../static'), {
        index: false,
        maxAge: ONE_YEAR_IN_MS,
        immutable: true
    })

    app.use('/static', staticFilesMiddleware)

    const assetsMiddleware = serveStaticGzip(resolvePath('../client/assets'), {
        enableBrotli: true,
        serveStatic: {
            index: false,
            maxAge: ONE_YEAR_IN_MS,
            immutable: true
        }
    })

    app.use('/assets', assetsMiddleware)

    app.use(cookieParser())

    // Setting up these routes before public files middleware
    // to prevent exposing index.html & ssr-manifest.json to client
    app.all('/index.html', ssrHandler)
    app.all('/ssr-manifest.json', ssrHandler)

    const publicFilesMiddleware = serveStatic(resolvePath('../client'), {
        index: false
    })

    app.use(publicFilesMiddleware)

    app.use(ssrHandler)

    app.listen(3000, () => {
        console.log('SSR production server listening on port 3000')
    })
}

asyncWrap().catch(console.error)
