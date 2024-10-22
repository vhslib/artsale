export function capitalize(string: string) {
    const head = string[0]

    if (head === undefined) {
        return ''
    }

    const tail = string.slice(1)
    return head.toUpperCase() + tail
}
