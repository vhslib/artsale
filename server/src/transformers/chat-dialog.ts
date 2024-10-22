import type { ChatDialog as ChatDialogTransformed } from 'artsale-shared'
import type { ChatDialog } from '../entities/chat-dialog.js'
import { transformChatMessage } from './chat-message.js'
import { transformItem } from './item.js'
import { transformOtherUserProfileData } from './user.js'

export function transformChatDialog(dialog: ChatDialog, myId: number): ChatDialogTransformed {
    const otherUser = dialog.creator.id === myId ? dialog.acceptor : dialog.creator

    return {
        creatorId: dialog.creatorId,
        creatorMessage: dialog.creatorMessage,
        dateCreated: dialog.dateCreated.getTime(),
        messages: dialog.messages.map(transformChatMessage),
        otherUser: transformOtherUserProfileData(otherUser),
        item: transformItem(dialog.item)
    }
}
