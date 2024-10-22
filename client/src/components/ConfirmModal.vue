<template>
  <BaseModal :is-open="isOpen" @close="close(false)">
    <div>
      <h3>{{ title }}</h3>
      <p>{{ message }}</p>

      <div class="buttons">
        <BaseButton class="yes button" kind="red" @click="close(true)">
          Да
        </BaseButton>

        <BaseButton class="button" kind="red" @click="close(false)">
          Нет
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

withDefaults(defineProps<Props>(), { title: 'Подтвердите действие' })

const isOpen = ref(false)
const emitter = new EventEmitter<{ close(success: boolean): void }>()

function close(success: boolean) {
    isOpen.value = false
    emitter.emit('close', success)
}

defineExpose({
    open() {
        isOpen.value = true
        return new Promise<boolean>((resolve) => emitter.once('close', resolve))
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

.yes {
    margin-right: 15px;
}
</style>
