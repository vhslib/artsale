export function stringToNumberStrict(string: string | undefined) {
    if (string === undefined) {
        return
    }

    if (string === '') {
        return
    }

    if (containsNonNumericDigits(string)) {
        return
    }

    const number = Number(string)

    if (!isFinite(number)) {
        return
    }

    return number
}

function containsNonNumericDigits(string: string) {
    for (const char of string) {
        if (char === '-') {
            continue
        }

        if (char === '.') {
            continue
        }

        const code = char.charCodeAt(0)

        // 0-9
        if (code >= 48 && code <= 57) {
            continue
        }

        return true
    }

    return false
}
