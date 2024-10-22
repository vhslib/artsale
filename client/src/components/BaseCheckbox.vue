<template>
  <div class="checkbox" @click="toggle">
    <div class="indicator" :class="{ checked: modelValue, error: validation?.isError() }" />
    <slot />
  </div>
</template>

<script lang="ts" setup>
import type { FieldValidation } from '../composables/field-validation.js'

interface Props {
    modelValue: boolean
    validation?: FieldValidation
}

interface Emits {
    (e: 'update:modelValue', value: boolean): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

function toggle() {
    emit('update:modelValue', !props.modelValue)
    props.validation?.touch()
}
</script>

<style scoped>
.checkbox {
    position: relative;
    cursor: pointer;
    display: block;
    padding-left: 26px;
    font-size: 12px;
    line-height: 16px
}

.indicator {
    background: url("data:image/svg+xml,%3Csvg width='8' height='7' viewBox='0 0 8 7' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0.5 3.5L3.5 6L7.5 1' stroke='white'/%3E%3C/svg%3E%0A") no-repeat center;
    width: 16px;
    height: 16px;
    position: absolute;
    left: 0;
    top: 0;
    border: 1px solid #d1d1da;
    transition: all .3s
}

.indicator.error {
    border-color: #dc2018;
}

.indicator.checked {
    background: url("data:image/svg+xml,%3Csvg width='8' height='7' viewBox='0 0 8 7' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0.5 3.5L3.5 6L7.5 1' stroke='white'/%3E%3C/svg%3E%0A") no-repeat center #fb0f47;
    border-color: #fb0f47;
}
</style>
