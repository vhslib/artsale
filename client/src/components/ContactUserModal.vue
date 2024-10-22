<template>
  <BaseModal :is-open="isOpen" @close="justClose">
    <div>
      <h3>Напишите сообщение продавцу</h3>
      <p>Продавец узнает, что вы заинтересовались этим объявлением</p>

      <form @submit.prevent="closeWithMessage">
        <BaseTextarea v-model="message" :validation="messageValidation" placeholder="Напишите сообщение" />

        <BaseButton class="button" kind="red">
          Отправить
        </BaseButton>
      </form>
    </div>
  </BaseModal>
</template>

<script lang="ts" setup>
import BaseButton from './BaseButton.vue'
import BaseModal from './BaseModal.vue'
import BaseTextarea from './BaseTextarea.vue'
import { chatMessageSchema } from 'artsale-shared'
import EventEmitter from 'eventemitter3'
import { ref } from 'vue'
import { useFieldValidation } from '../composables/field-validation.js'

const isOpen = ref(false)
const emitter = new EventEmitter<{ close(message?: string): void }>()

const message = ref('')
const messageValidation = useFieldValidation(message, chatMessageSchema)

function justClose() {
    isOpen.value = false
    emitter.emit('close')
}

function closeWithMessage() {
    messageValidation.touch()

    if (messageValidation.isError()) {
        return
    }

    isOpen.value = false
    emitter.emit('close', message.value)
}

defineExpose({
    open() {
        isOpen.value = true
        return new Promise<string | undefined>((resolve) => emitter.once('close', resolve))
    }
})
</script>

<style scoped>
h3 {
    font-size: 18px;
    line-height: 178%;
    text-align: center;
    margin-bottom: 5px;
}

p {
    font-size: 14px;
    line-height: 24px;
}

form {
    margin-top: 20px;
}

.button {
    margin-top: 20px;
    width: 100%;
}
</style>
