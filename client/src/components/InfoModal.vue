<template>
  <BaseModal :is-open="isOpen" @close="close">
    <div>
      <h3>{{ title }}</h3>
      <p>{{ message }}</p>

      <div class="buttons">
        <BaseButton kind="red" class="button" @click="close">
          OK
        </BaseButton>
      </div>
    </div>
  </BaseModal>
</template>

<script lang="ts" setup>
import BaseButton from './BaseButton.vue'
import BaseModal from './BaseModal.vue'
import EventEmitter from 'eventemitter3'
import { ref } from 'vue'

interface Props {
    title?: string
    message: string
}

withDefaults(defineProps<Props>(), { title: 'Ошибка' })

const isOpen = ref(false)
const emitter = new EventEmitter<{ close(): void }>()

function close() {
    isOpen.value = false
    emitter.emit('close')
}

defineExpose({
    open() {
        isOpen.value = true
        return new Promise<void>((resolve) => emitter.once('close', resolve))
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

.buttons {
    display: flex;
    margin-top: 40px;
}

.button {
    width: 100%;
}
</style>
