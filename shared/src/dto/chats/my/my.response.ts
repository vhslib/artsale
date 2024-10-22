import type { ChatDialog } from '../../../entities/chat-dialog.js'
import type { GenericResponse } from '../../../generic-response.js'

export interface ChatsMyResponse extends GenericResponse<'Ok'> {
    dialogs: ChatDialog[]
}
