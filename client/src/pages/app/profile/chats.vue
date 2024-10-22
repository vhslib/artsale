<template>
  <h3>Мои диалоги</h3>

  <div v-if="dialogs.length === 0">
    Нет диалогов
  </div>

  <RouterLink
    v-for="dialog in dialogs"
    :key="dialog.id"
    class="dialog"
    :to="{ name: 'Profile.Chat', params: { userId: dialog.otherUser.id } }"
  >
    <div class="header-row">
      <div class="person-name" :to="{ name: 'Profile.Chat', params: { userId: dialog.otherUser.id } }">
        {{ dialog.otherUser.firstName }} {{ dialog.otherUser.lastName }}
      </div>

      <div class="date">
        {{ formatDate(dialog.lastMessageInfo.date) }}
      </div>
    </div>

    <div class="last-message">
      <span class="sender">
        {{ store.profileData!.firstName }}
      </span>:

      {{ dialog.lastMessageInfo.text }}
    </div>
  </RouterLink>
</template>

<script lang="ts" setup>
import type { ChatsMyResponse } from 'artsale-shared'
import { useTitle } from '../../../composables/title.js'
import { useChatService, usePageData, useStore } from '../../../context.js'
import { formatDate } from '../../../util/format-date.js'

useTitle('Диалоги')
const store = useStore()
const chatService = useChatService()
const response = usePageData<ChatsMyResponse>()

const dialogs = response.dialogs.map((dialog) => {
    const creator = chatService.getCreator(dialog)
    const acceptor = chatService.getAcceptor(dialog)

    return {
        ...dialog,
        id: `${creator.id}-${acceptor.id}`,
        lastMessageInfo: chatService.getLastMessageInfo(dialog)
    }
})
</script>

<style scoped>
h3 {
    margin-bottom: 30px;
}

.dialog {
    padding: 15px;
    border-bottom: 1px solid #c5c5d1;
    text-decoration: none;
    display: block;
    color: #1a1a47;
    margin-bottom: 20px;
}

.header-row {
    margin-bottom: 10px;
}

.person-name {
    font-weight: bold;
    font-size: 16px;
    display: inline-block;
    margin-right: 10px;
}

.sender {
    font-style: italic;
}

.date {
    font-size: 12px;
    color: #8c8ca3;
    display: inline-block;
}
</style>
