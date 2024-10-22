import type { Item } from '../../../entities/item.js'
import type { GenericResponse } from '../../../generic-response.js'

export interface ItemsSearchResponse extends GenericResponse<'Ok'> {
    items: Item[]
}
