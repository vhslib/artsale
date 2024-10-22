import { bind } from './bind.js'

export function stringToNumber(string: string | undefined) {
    return bind(string, Number)
}
