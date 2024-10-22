import type { ChatDialog } from '../../../entities/chat-dialog.js'
import type { GenericResponse } from '../../../generic-response.js'

export interface ChatsGetByUserOkResponse extends GenericResponse<'Ok'> {
    dialog: ChatDialog
}

export type ChatsGetByUserResponse = ChatsGetByUserOkResponse | GenericResponse<'NotFound'>
