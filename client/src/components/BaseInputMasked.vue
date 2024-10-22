<template>
  <input
    ref="element"
    :class="{ error: validation?.isError() }"
    @blur="validation?.touch()"
  />
</template>

<script lang="ts" setup>
import type { AnyMaskedOptions } from 'imask'
import IMask from 'imask'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { FieldValidation } from '../composables/field-validation.js'

interface Props {
    modelValue: string
    validation?: FieldValidation
    mask: AnyMaskedOptions
}

interface Emits {
    (e: 'update:modelValue', value: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const element = ref<HTMLInputElement | null>(null)

onMounted(() => {
    const imask = IMask(element.value!, props.mask)

    imask.on('accept', () => {
        emit('update:modelValue', imask.value)
    })

    watch(
        () => props.modelValue,
        () => {
            imask.value = props.modelValue

            // If an invalid value provided by parent component,
            // re-emit the correct value
            if (imask.value !== props.modelValue) {
                emit('update:modelValue', imask.value)
            }
        },
        { immediate: true }
    )

    onBeforeUnmount(() => {
        imask.destroy()
    })
})
</script>

<style scoped>
input {
    font: 14px 'Montserrat';
    box-shadow: none;
    border-radius: 0;
    border: 1px solid #c5c5d1;
    color: #1a1a47;
    padding: 14px 23px 14px 20px;
    width: 100%;
}

input::placeholder {
    opacity: 1;
}

input:placeholder-shown {
    color: gray;
}

input.error::placeholder {
    opacity: 0.5;
}

input.error {
    background: url("data:image/svg+xml,%3Csvg width='8' height='8' viewBox='0 0 8 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L7 7M1 7L7 1' stroke='%23DC2018'/%3E%3C/svg%3E%0A") no-repeat right 17px center;
    border: 1px solid #dc2018;
    color: #dc2018;
}
</style>
