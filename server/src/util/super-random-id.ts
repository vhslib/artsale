import { random } from 'lodash-es'
import { tuple } from './tuple.js'

// Returns /randomCharsLength/ random chars + current timestamp converted to letters
export function createSuperRandomId(randomCharsLength: number) {
    let code = ''

    for (let i = 0; i < randomCharsLength; i++) {
        code += randomChar()
    }

    for (const digit of Date.now().toString()) {
        code += String.fromCharCode(65 + Number(digit))
    }

    return code
}

function randomChar() {
    const ranges = [
        // 0-9
        tuple(48, 57),

        // A-Z
        tuple(65, 90),

        // a-z
        tuple(97, 122)
    ]

    const [min, max] = ranges[random(ranges.length - 1)]!
    return String.fromCharCode(random(min, max))
}
