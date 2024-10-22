import cookieParser from 'cookie-parser'
import express from 'express'
import { readFile } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { createServer as createViteServer } from 'vite'
import type * as EntryServer from './src/entry-server.js'

function resolvePath(p: string) {
    return path.resolve(path.dirname(fileURLToPath(import.meta.url)), p)
}

const app = express()

app.use(cookieParser())

const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom'
})

app.use(vite.middlewares)

app.use(async (request, response) => {
    try {
        const { compileTemplate, handleRequest } = (await vite.ssrLoadModule('/src/entry-server.ts')) as typeof EntryServer

        const raw = await readFile(resolvePath('index.html'), 'utf-8')
        const transformed = await vite.transformIndexHtml(request.originalUrl, raw)
        const template = compileTemplate(transformed)

        await handleRequest({
            url: request.originalUrl,
            manifest: {},
            template,
            request,
            response
        })
    }
    catch (e) {
        if (e instanceof Error) {
            vite.ssrFixStacktrace(e)
            console.error(e.stack)

            response.status(500)
            response.end(e.stack)
        }
    }
})

app.listen(3000, () => {
    console.log('SSR dev server listening on port 3000')
})
