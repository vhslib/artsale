import type { Item } from '../../../entities/item.js'
import type { OtherUserProfileData } from '../../../entities/other-user-profile-data.js'
import type { GenericResponse } from '../../../generic-response.js'

export interface ItemsGetByAuthorOkResponse extends GenericResponse<'Ok'> {
    author: OtherUserProfileData
    items: Item[]
}

export type ItemsGetByAuthorResponse = ItemsGetByAuthorOkResponse | GenericResponse<'NotFound'>
