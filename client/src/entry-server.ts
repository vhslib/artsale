import devalue from 'devalue'
import type { Request, Response } from 'express'
import { template } from 'lodash-es'
import path from 'path'
import type { SSRContext } from 'vue/server-renderer'
import { renderToString } from 'vue/server-renderer'
import { createApp } from './app.js'
import { createServerSideStorage } from './services/storage/server.js'

function stringifyPayload(payload: typeof window.PAYLOAD) {
    return devalue(payload)
}

interface TemplateData {
    development: boolean
    title: string
    meta: Map<string, string>
    preloadLinks: string[]
    html: string
    payload: string
}

type Template = (data: TemplateData) => string

export function compileTemplate(source: string): Template {
    return template(source, {
        interpolate: /{{([\s\S]+?)}}/g,
        escape: /{{{([\s\S]+?)}}}/g,
        evaluate: /%%([\s\S]+?)%%/g
    })
}

interface RenderParams {
    template: Template
    url: string
    request: Request
    response: Response
    manifest: Record<string, string[]>
}

export async function handleRequest({ template, url, request, response, manifest }: RenderParams) {
    const context = createApp(createServerSideStorage(request, response))
    await context.router.push(url)

    const route = context.router.currentRoute.value
    const isNotFound = route.name === 'NotFound'

    const ctx: SSRContext & { modules?: Set<string> } = {}

    const html = template({
        development: import.meta.env.DEV,
        html: await renderToString(context.app, ctx),
        title: context.title,
        meta: context.meta,
        preloadLinks: renderPreloadLinks(ctx.modules!, manifest),
        payload: stringifyPayload({
            isNotFound,
            url: route.fullPath,
            pinia: context.pinia.state.value,
            pageData: context.pageData
        })
    })

    response.status(isNotFound ? 404 : 200)
    response.type('text/html')
    response.end(html)
}

function renderPreloadLinks(modules: Set<string>, manifest: Record<string, string[]>) {
    const links: string[] = []
    const seen = new Set()

    for (const module of modules) {
        const files = manifest[module]

        if (!files) {
            continue
        }

        for (const file of files) {
            if (seen.has(file)) {
                continue
            }

            seen.add(file)

            const filename = path.basename(file)
            const depFiles = manifest[filename]

            if (depFiles) {
                for (const depFile of depFiles) {
                    const link = renderPreloadLink(file)

                    if (link !== undefined) {
                        links.push(link)
                    }

                    seen.add(depFile)
                }
            }

            const link = renderPreloadLink(file)

            if (link !== undefined) {
                links.push(link)
            }
        }
    }

    return links
}

function renderPreloadLink(file: string) {
    switch (path.extname(file)) {
        case '.js': return `<link rel="modulepreload" href="${file}">`
        case '.css': return `<link rel="stylesheet" href="${file}">`
        case '.woff2': return `<link rel="preload" href="${file}" as="font" type="font/woff2">`
        case '.gif': return `<link rel="preload" href="${file}" as="image" type="image/gif">`
        case '.jpg': return `<link rel="preload" href="${file}" as="image" type="image/jpeg">`
        case '.jpeg': return `<link rel="preload" href="${file}" as="image" type="image/jpeg">`
        case '.png': return `<link rel="preload" href="${file}" as="image" type="image/png">`
        case '.webp': return `<link rel="preload" href="${file}" as="image" type="image/webp">`
    }
}
