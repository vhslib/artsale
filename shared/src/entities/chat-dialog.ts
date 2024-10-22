import type { ChatMessage } from './chat-message.js'
import type { Item } from './item.js'
import type { OtherUserProfileData } from './other-user-profile-data.js'

export interface ChatDialog {
    creatorId: number
    creatorMessage: string
    item: Item
    dateCreated: number
    otherUser: OtherUserProfileData
    messages: ChatMessage[]
}
