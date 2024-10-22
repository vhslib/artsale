export function isPageReload() {
    const entry = performance.getEntriesByType('navigation')[0]
    return entry instanceof PerformanceNavigationTiming && entry.type === 'reload'
}
