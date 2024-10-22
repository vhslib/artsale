export type CategoryPropertyType = 'OPTION' | 'MULTI_OPTION'

export interface CategoryProperty {
    id: number
    name: string
    type: CategoryPropertyType
    options: string[]
}
