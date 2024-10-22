<template>
  <OnClickOutside @trigger="onClickOutside">
    <div class="container" :class="{ open: isOpen }">
      <div class="selection" :class="{ error: validation?.isError() }" @click="toggleOpen">
        <div v-if="selectedOptions.length !== 0" class="selection-rendered">
          <div v-for="option in selectedOptions" :key="getOptionId(option)" class="choice">
            <button
              type="button"
              class="choice-remove"
              @click.stop="removeOption(getOptionId(option))"
            >
              ×
            </button>

            <span class="choice-display">
              {{ getOptionText(option) }}
            </span>
          </div>
        </div>

        <div v-else class="selection-rendered placeholder">
          {{ placeholder }}
        </div>
      </div>
    </div>

    <div class="container">
      <div v-show="isOpen" class="dropdown">
        <div class="results">
          <div class="options">
            <div
              v-for="option in options"
              :key="getOptionId(option)"
              :class="{ selected: selectedOptions.includes(option) }"
              class="option"
              @click="toggleOption(getOptionId(option))"
            >
              {{ getOptionText(option) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </OnClickOutside>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { OnClickOutside } from '@vueuse/components'
import type { FieldValidation } from '../composables/field-validation.js'

interface Option {
    id: string
    text: string
}

interface Props {
    options: (Option | string)[]
    modelValue: string[]
    placeholder?: string
    validation?: FieldValidation
}

interface Emits {
    (e: 'update:modelValue', values: string[]): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

function getOptionId(option: Option | string) {
    if (typeof option === 'string') {
        return option
    }

    return option.id
}

function getOptionText(option: Option | string) {
    if (typeof option === 'string') {
        return option
    }

    return option.text
}

const selectedOptions = computed(() => props.options.filter((o) => props.modelValue.includes(getOptionId(o))))
const isOpen = ref(false)

function onClickOutside() {
    if (isOpen.value) {
        props.validation?.touch()
    }

    isOpen.value = false
}

function toggleOpen() {
    if (isOpen.value) {
        isOpen.value = false
        props.validation?.touch()
    }
    else {
        isOpen.value = true
    }
}

function removeOption(removedId: string) {
    if (isOpen.value) {
        props.validation?.touch()
    }

    isOpen.value = false

    emit('update:modelValue', props.modelValue.filter((id) => id !== removedId))
}

function toggleOption(optionId: string) {
    if (props.modelValue.includes(optionId)) {
        emit('update:modelValue', props.modelValue.filter((id) => id !== optionId))
    }
    else {
        emit('update:modelValue', [...props.modelValue, optionId])
    }
}
</script>

<style scoped>
.container {
    width: 100%;
    box-sizing: border-box;
    margin: 0;
    position: relative;
    user-select: none;
}

.selection {
    padding-right: 0;
    overflow: hidden;
    border: 1px solid #c5c5d1;
    border-radius: 0;
    min-height: 48px;
    background-color: white;
    cursor: text;
    padding-bottom: 5px;
    position: relative;
    cursor: pointer;
}

.selection.error {
    border-color: #dc2018;
}

.selection-rendered {
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 8px 20px;
    flex-wrap: wrap;
}

.selection-rendered::after {
    width: 4px;
    height: 4px;
    border: 0 solid;
    background: 0 0;
    border-left: 1px solid #000;
    border-bottom: 1px solid #000;
    transform: rotate(-45deg);
    display: block;
    content: '';
    position: absolute;
    right: 10px;
    top: 21px;
}

.container.open .selection-rendered::after {
    transform: rotate(-45deg) scale(-1);
    top: 23px;
}

.choice {
    background-color: #e4e4e4;
    border: 1px solid #aaa;
    border-radius: 4px;
    box-sizing: border-box;
    display: inline-block;
    margin-left: 5px;
    margin-top: 5px;
    padding: 0;
    padding-left: 20px;
    position: relative;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.choice-remove {
    background-color: transparent;
    border: none;
    border-right: 1px solid #aaa;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    color: #999;
    cursor: pointer;
    font-size: 1em;
    font-weight: bold;
    padding: 0 4px;
    position: absolute;
    left: 0;
    top: 0;
}

.choice-display {
    cursor: default;
    padding-left: 2px;
    padding-right: 5px;
    color: black;
}

.dropdown {
    position: absolute;
    left: 0;
    width: 100%;
    z-index: 1051;
    background-color: white;
    border-radius: 0;
    border: 2px solid white;
    box-shadow: 0 6px 12px rgba(26, 26, 71, .1);
}

.results {
    padding: 12px 0;
}

.options {
    max-height: 139px;
    overflow-y: auto;
}

.option {
    background: white;
    color: black;
    cursor: pointer;
    padding: 6px 18px;
    margin-bottom: 1px;
    font-size: 12px
}

.option::before {
    display: inline-block;
    content: "";
    width: 16px;
    margin-right: 10px;
    position: relative;
    top: 3px;
    height: 16px;
    border: 1px solid #d1d1da;
}

.option.selected::before {
    background: url("data:image/svg+xml,%3Csvg width='9' height='7' viewBox='0 0 9 7' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 3.35294L3.42308 6L8 1' stroke='white' stroke-linecap='square'/%3E%3C/svg%3E%0A") no-repeat center #fb0f47;
    border-color: #fb0f47
}

.placeholder {
    color: gray;
    margin-top: 5px;
}

.selection.error .placeholder {
    color: #dc2018;
}
</style>
