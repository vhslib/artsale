import { useContext } from '../context.js'

export function useTitle(title: string) {
    const fullTitle = `${title} - ArtSale.ru`

    if (import.meta.env.SSR) {
        const context = useContext()

        context.title = fullTitle
        return
    }

    document.title = fullTitle
}
