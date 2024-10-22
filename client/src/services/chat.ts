import type { ChatDialog, ChatMessage } from 'artsale-shared'
import type { AppContext } from '../context.js'

export type ChatService = ReturnType<typeof createChatService>

export function createChatService(context: AppContext) {
    function getCreator(dialog: ChatDialog) {
        const me = context.store.profileData!

        if (dialog.creatorId === me.id) {
            return me
        }

        return dialog.otherUser
    }

    function getAcceptor(dialog: ChatDialog) {
        const me = context.store.profileData!

        if (dialog.creatorId === me.id) {
            return dialog.otherUser
        }

        return me
    }

    function getSender(dialog: ChatDialog, message: ChatMessage) {
        const me = context.store.profileData!

        if (message.senderId === me.id) {
            return me
        }

        return dialog.otherUser
    }

    function getReceiver(dialog: ChatDialog, message: ChatMessage) {
        const me = context.store.profileData!

        if (message.senderId === me.id) {
            return dialog.otherUser
        }

        return me
    }

    function getLastMessageInfo(dialog: ChatDialog) {
        const lastMessage = dialog.messages[dialog.messages.length - 1]

        if (!lastMessage) {
            return {
                sender: getCreator(dialog),
                text: dialog.creatorMessage,
                date: dialog.dateCreated
            }
        }

        return {
            sender: getSender(dialog, lastMessage),
            text: lastMessage.text,
            date: lastMessage.date
        }
    }

    return {
        getCreator,
        getAcceptor,
        getSender,
        getReceiver,
        getLastMessageInfo
    }
}
