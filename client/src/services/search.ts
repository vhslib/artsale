import type { Category } from 'artsale-shared'
import { getOptionPropertySchema } from 'artsale-shared'
import type { RouteLocationNormalized } from 'vue-router'
import { getRouteParams } from '../router/helpers.js'
import { createSlug } from '../util/slug.js'
import { tuple } from '../util/tuple.js'

export function parseProperties(route: RouteLocationNormalized, category: Category) {
    const params = getRouteParams(route, 'properties')
    const properties = new Map<number, string>()

    for (const param of params) {
        const indexOfUnderscore = param.indexOf('_')

        if (indexOfUnderscore === -1) {
            return
        }

        const key = param.slice(0, indexOfUnderscore)
        const value = param.slice(indexOfUnderscore + 1)

        const result = parseProperty(key, value, category)

        if (!result) {
            return
        }

        const [id, valueParsed] = result
        properties.set(id, valueParsed)
    }

    return properties
}

function parseProperty(slug: string, value: string, category: Category) {
    const property = category.properties.find((p) => createSlug(p.name) === slug)

    if (!property) {
        return
    }

    switch (property.type) {
        case 'OPTION':
        case 'MULTI_OPTION': {
            const unslugged = property.options.find((o) => createSlug(o) === value)

            if (unslugged === undefined) {
                return
            }

            if (!getOptionPropertySchema(property.options).safeParse(unslugged).success) {
                return
            }

            return tuple(property.id, unslugged)
        }
    }
}
