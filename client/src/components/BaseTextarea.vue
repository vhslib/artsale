<template>
  <textarea
    ref="element"
    v-model="model"
    :rows="1"
    :class="{ error: validation?.isError() }"
    @blur="validation?.touch()"
  />
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { useVModel } from '@vueuse/core'
import type { FieldValidation } from '../composables/field-validation.js'

interface Props {
    modelValue: string
    validation?: FieldValidation
}

interface Emits {
    (e: 'update:modelValue', value: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const model = useVModel(props, 'modelValue', emit)

const element = ref<HTMLTextAreaElement | null>(null)

function setHeight() {
    element.value!.style.height = 'auto'

    const height = element.value!.scrollHeight

    if (height === 0) {
        element.value!.style.height = ''
        return
    }

    element.value!.style.height = `${height}px`
}

watch(
    () => props.modelValue,
    () => {
        if (element.value) {
            setHeight()
        }
    }
)

onMounted(setHeight)
</script>

<style scoped>
textarea {
    font: 14px 'Montserrat';
    border: 1px solid #c5c5d1;
    padding: 15px 23px 15px 20px;
    width: 100%;
    resize: none;
    overflow-y: hidden;
}

textarea::placeholder {
    opacity: 1;
}

textarea:placeholder-shown {
    color: gray;
}

textarea.error::placeholder {
    opacity: 0.5;
}

textarea.error {
    background: url("data:image/svg+xml,%3Csvg width='8' height='8' viewBox='0 0 8 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L7 7M1 7L7 1' stroke='%23DC2018'/%3E%3C/svg%3E%0A") no-repeat right 17px center;
    border: 1px solid #dc2018;
    color: #dc2018
}
</style>
