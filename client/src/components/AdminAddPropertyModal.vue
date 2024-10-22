<template>
  <BaseModal :is-open="isOpen" @close="justClose">
    <div>
      <h3>Добавить свойство для категории {{ category.name }}</h3>

      <form @submit.prevent="closeWithResult">
        <BaseInput v-model="name" :validation="nameValidation" placeholder="Название свойства" />

        <BaseCheckbox v-model="isMulti">
          Множественный выбор
        </BaseCheckbox>

        <BaseButton class="button" kind="red">
          Сохранить
        </BaseButton>
      </form>
    </div>
  </BaseModal>
</template>

<script lang="ts" setup>
import BaseButton from './BaseButton.vue'
import BaseCheckbox from './BaseCheckbox.vue'
import BaseInput from './BaseInput.vue'
import BaseModal from './BaseModal.vue'
import type { Category } from 'artsale-shared'
import { propertyNameSchema } from 'artsale-shared'
import EventEmitter from 'eventemitter3'
import { ref } from 'vue'
import { useFieldValidation } from '../composables/field-validation.js'

interface Props {
    category: Category
}

defineProps<Props>()

const isOpen = ref(false)

interface Result {
    name: string
    type: 'OPTION' | 'MULTI_OPTION'
}

const emitter = new EventEmitter<{ close(result?: Result): void }>()

const name = ref('')
const nameValidation = useFieldValidation(name, propertyNameSchema)

const isMulti = ref(false)

function justClose() {
    isOpen.value = false
    emitter.emit('close')
}

function closeWithResult() {
    nameValidation.touch()

    if (nameValidation.isError()) {
        return
    }

    isOpen.value = false

    emitter.emit('close', {
        name: name.value,
        type: isMulti.value ? 'MULTI_OPTION' : 'OPTION'
    })
}

defineExpose({
    open() {
        isOpen.value = true
        return new Promise<Result | undefined>((resolve) => emitter.once('close', resolve))
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
