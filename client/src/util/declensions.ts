import { tuple } from './tuple.js'

export const declensions = {
    item: tuple('объявление', 'объявления', 'объявлений')
}

export function applyDeclension(count: number, [one, some, many]: [string, string, string]) {
    const lastTwo = count % 100

    // 0, 10, 20, 30, 100, 1000...
    if (lastTwo === 0) {
        return many
    }

    // 11 - 19
    if (lastTwo >= 11 && lastTwo <= 19) {
        return many
    }

    const last = count % 10

    // 1, 21, 31, 101, 1001...
    if (last === 1) {
        return one
    }

    // 2, 3, 4, 22, 23, 24, 102, 103, 104...
    if (last >= 2 && last <= 4) {
        return some
    }

    return many
}
