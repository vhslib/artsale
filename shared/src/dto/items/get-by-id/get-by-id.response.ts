import type { Item } from '../../../entities/item.js'
import type { OtherUserProfileData } from '../../../entities/other-user-profile-data.js'
import type { GenericResponse } from '../../../generic-response.js'

export interface ItemsGetByIdOkResponse extends GenericResponse<'Ok'> {
    author: OtherUserProfileData
    item: Item
}

export type ItemsGetByIdResponse = ItemsGetByIdOkResponse | GenericResponse<'NotFound'>
