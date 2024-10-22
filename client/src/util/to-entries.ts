export function toEntries<K, V>(map: Map<K, V>) {
    return Array.from(map.entries())
}
