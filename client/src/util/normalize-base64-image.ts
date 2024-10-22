export function normalizeBase64Image(raw: string) {
    const commaIndex = raw.indexOf(',')
    return raw.slice(commaIndex + 1)
}
