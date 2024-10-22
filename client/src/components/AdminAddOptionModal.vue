<template>
  <BaseModal :is-open="isOpen" @close="justClose">
    <div>
      <h3>Добавить опцию для свойства {{ property.name }}</h3>

      <form @submit.prevent="closeWithResult">
        <BaseInput v-model="option" :validation="optionValidation" placeholder="Текст опции" />

        <BaseButton class="button" kind="red">
          Сохранить
        </BaseButton>
      </form>
    </div>
  </BaseModal>
</template>

<script lang="ts" setup>
import BaseButton from './BaseButton.vue'
import BaseInput from './BaseInput.vue'
import BaseModal from './BaseModal.vue'
import type { CategoryProperty } from 'artsale-shared'
import { optionSchema } from 'artsale-shared'
import EventEmitter from 'eventemitter3'
import { ref } from 'vue'
import { useFieldValidation } from '../composables/field-validation.js'

interface Props {
    property: CategoryProperty
}

defineProps<Props>()

const isOpen = ref(false)
const emitter = new EventEmitter<{ close(option?: string): void }>()

const option = ref('')
const optionValidation = useFieldValidation(option, optionSchema)

function justClose() {
    isOpen.value = false
    emitter.emit('close')
}

function closeWithResult() {
    optionValidation.touch()

    if (optionValidation.isError()) {
        return
    }

    isOpen.value = false
    emitter.emit('close', option.value)
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

.button {
    margin-top: 20px;
    width: 100%;
}
</style>
