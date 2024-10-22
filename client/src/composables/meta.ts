import { useContext } from '../context.js'

export function useMeta(name: string, content: string | undefined) {
    if (content === undefined) {
        removeMeta(name)
        return
    }

    if (import.meta.env.SSR) {
        const context = useContext()
        context.meta.set(name, content)
        return
    }

    const existingMeta = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)

    if (existingMeta) {
        existingMeta.content = content
        return
    }

    const newMeta = document.createElement('meta')
    newMeta.name = name
    newMeta.content = content
    document.head.appendChild(newMeta)
}

function removeMeta(name: string) {
    if (import.meta.env.SSR) {
        const context = useContext()
        context.meta.delete(name)
        return
    }

    const meta = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
    meta?.remove()
}
