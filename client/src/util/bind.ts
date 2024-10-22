export function bind<T1, T2>(value: T1 | undefined, fn: (value: T1) => T2) {
    if (value === undefined) {
        return
    }

    return fn(value)
}
