<template>
  <h3>
    Диалог:
    <RouterLink class="other-user-link" :to="{ name: 'UserItems', params: { userId: dialog.otherUser.id } }">
      {{ dialog.otherUser.firstName }} {{ dialog.otherUser.lastName }}
    </RouterLink>
  </h3>

  <div ref="dialogBox" class="dialog">
    <div>
      <div class="intro-text">
        <template v-if="dialog.creatorId === store.profileData!.id">
          Вы написали этому пользователю по поводу объявления:
        </template>

        <template v-else>
          Этот пользователь откликнулся на ваше объявление:
        </template>
      </div>

      <div class="item">
        <RouterLink :to="resolveItemRoute(category, dialog.item)" class="item-link">
          <img :src="getStaticImageUrl(dialog.item.images[0]!, 'small')" :alt="dialog.item.name" />

          <div class="item-name">
            {{ dialog.item.name }}
          </div>
        </RouterLink>
      </div>

      <div class="message">
        <div class="message-head">
          <span class="message-sender">
            {{ dialog.creator.firstName }}
          </span>

          <span class="message-time">
            {{ formatDate(dialog.dateCreated) }}
          </span>
        </div>

        <div class="message-body">
          {{ dialog.creatorMessage }}
        </div>
      </div>
    </div>

    <div v-for="message in dialog.messages" :key="message.id" class="message">
      <div class="message-head">
        <span class="message-sender">
          {{ message.sender.firstName }}
        </span>

        <span class="message-time">
          {{ formatDate(message.date) }}
        </span>
      </div>

      <div class="message-body">
        {{ message.text }}
      </div>
    </div>

    <form @submit.prevent="onSubmit">
      <BaseInput
        v-model="text"
        class="text-input"
        placeholder="Введите сообщение..."
      />

      <BaseButton kind="red" class="button">
        Отправить
      </BaseButton>
    </form>
  </div>
</template>

<script lang="ts" setup>
import BaseButton from '../../../components/BaseButton.vue'
import BaseInput from '../../../components/BaseInput.vue'
import type { ChatsGetByUserOkResponse } from 'artsale-shared'
import { chatMessageSchema } from 'artsale-shared'
import { computed, nextTick, onMounted, ref } from 'vue'
import { useFieldValidation } from '../../../composables/field-validation.js'
import { onServerEvent } from '../../../composables/server-events.js'
import { useTitle } from '../../../composables/title.js'
import { useApi, useChatService, usePageData, useStore } from '../../../context.js'
import { getStaticImageUrl } from '../../../urls.js'
import { formatDate } from '../../../util/format-date.js'
import { resolveItemRoute } from '../item.js'

const store = useStore()
const api = useApi()
const chatService = useChatService()

const dialogRaw = ref(usePageData<ChatsGetByUserOkResponse>().dialog)

const category = store.findCategoryById(dialogRaw.value.item.categoryId)!

const dialog = computed(() => {
    const dialog = dialogRaw.value

    return {
        ...dialog,
        creator: chatService.getCreator(dialog),
        acceptor: chatService.getAcceptor(dialog),
        messages: dialog.messages.map((message) => {
            return {
                ...message,
                sender: chatService.getSender(dialog, message),
                receiver: chatService.getReceiver(dialog, message)
            }
        })
    }
})

const { firstName, lastName } = dialog.value.otherUser
useTitle(`${firstName} ${lastName}: диалог`)

const text = ref('')
const validation = useFieldValidation(text, chatMessageSchema)

async function onSubmit() {
    validation.touch()

    if (validation.isError()) {
        return
    }

    await api.post('/chats/send-message', {
        userId: dialog.value.otherUser.id,
        text: text.value
    })

    text.value = ''
}

onServerEvent('chats.new-message', async ({ message }) => {
    dialogRaw.value.messages.push(message)
    await nextTick()
    scrollToBottom()
})

const dialogBox = ref<HTMLElement | null>(null)

function scrollToBottom() {
    dialogBox.value!.scrollTop = dialogBox.value!.scrollHeight
}

onMounted(scrollToBottom)
</script>

<style scoped>
h3 {
    margin-bottom: 30px;
}

.dialog {
    max-height: 700px;
    overflow-y: scroll;
    padding: 35px;
}

.intro-text {
    text-align: center;
    margin-bottom: 20px;
    font-weight: 500;
}

.item {
    display: flex;
    margin-bottom: 35px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.item-link {
    color: inherit;
    text-decoration: none;
}

.item-name {
    font-size: 1.2em;
    font-weight: bold;
    margin-top: 10px
}

.message {
    margin-bottom: 25px;
}

.message-head {
    margin-bottom: 10px;
}

.message-sender {
    font-weight: bold;
    font-size: 15px;
    margin-right: 10px;
}

.message-time {
    font-size: 12px;
    color: #8c8ca3;
}

.message-body {
    font-size: 15px;
}

form {
    margin-top: 40px;
    display: flex;
}

.text-input {
    margin-right: 20px;
    width: 100%;
    flex-grow: 1;
}

.button {
    min-width: fit-content;
    width: auto;
}

.other-user-link {
    color: inherit;
}
</style>
