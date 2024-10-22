export interface Item {
    id: number
    name: string
    description: string
    price: number
    images: string[]
    status: ItemStatus
    datePublished: number
    categoryId: number
    authorId: number
    properties: [number, string | string[]][]
}

export type ItemStatus = 'ACTIVE' | 'INACTIVE' | 'DELETED'
