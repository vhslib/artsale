type Json = string | number | boolean | null | Json[] | { [key: string]: Json }

export function jsonParse<T extends Json>(string: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const json: T = JSON.parse(string)

    return json
}
