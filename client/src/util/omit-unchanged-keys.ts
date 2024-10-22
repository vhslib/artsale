export function omitUnchangedKeys<A, B extends A>(data: A, compareWith: B) {
    const partial: Partial<A> = {}

    for (const key in data) {
        if (data[key] !== compareWith[key]) {
            partial[key] = data[key]
        }
    }

    return partial
}
