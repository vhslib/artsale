export function omitIfEmptyString(string: string) {
    if (string.trim() === '') {
        return
    }

    return string
}
