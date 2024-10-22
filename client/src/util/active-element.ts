export function getActiveHtmlElement() {
    if (!(document.activeElement instanceof HTMLElement)) {
        return
    }

    return document.activeElement
}
