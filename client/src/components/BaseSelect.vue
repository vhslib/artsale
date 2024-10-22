<template>
  <OnClickOutside @trigger="onClickOutside">
    <div class="container" :class="{ open: isOpen }">
      <div class="selection" :class="{ error: validation?.isError() }" @click="toggleOpen">
        <div v-if="currentOption === undefined" class="selection-rendered placeholder">
          {{ placeholder }}
        </div>

        <div v-else class="selection-rendered">
          {{ getOptionText(currentOption) }}
        </div>
      </div>
    </div>

    <div class="container dropdown-container">
      <div v-show="isOpen" class="dropdown">
        <div class="options">
          <div class="option placeholder" @click="onSelect(undefined)">
            Не выбрано
          </div>

          <div
            v-for="option in options"
            :key="getOptionId(option)"
            class="option"
            :class="{ selected: getOptionId(option) === modelValue }"
            @click="onSelect(getOptionId(option))"
          >
            {{ getOptionText(option) }}
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
import { bind } from '../util/bind.js'

interface Option {
    id: string
    text: string
}

interface Props {
    options: (Option | string)[]
    modelValue?: string
    placeholder?: string
    validation?: FieldValidation
}

interface Emits {
    (e: 'update:modelValue', value: string | undefined): void
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

function findOptionById(id: string) {
    const option = props.options.find((o) => {
        if (typeof o === 'string') {
            return o === id
        }

        return o.id === id
    })

    return option!
}

const currentOption = computed(() => bind(props.modelValue, findOptionById))
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

function onSelect(id: string | undefined) {
    emit('update:modelValue', id)
    onClickOutside()
}
</script>

<style scoped>
.container {
    box-sizing: border-box;
    margin: 0;
    position: relative;
    width: 100%;
    user-select: none;
}

.selection {
    height: 48px;
    border: 1px solid #c5c5d1;
    border-radius: 0;
    background-color: #fff;
    box-sizing: border-box;
    cursor: pointer;
    display: block;
    user-select: none;
}

.selection.error {
    border-color: #dc2018;
}

.selection-rendered {
    display: block;
    padding-left: 8px;
    padding-right: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
    padding: 15px 23px 15px 20px;
    line-height: 18px;
    color: black;
}

.selection-rendered::after {
    width: 4px;
    height: 4px;
    border: none;
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

.dropdown-container {
    margin-top: 15px;
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

.options {
    max-height: 200px;
    overflow-y: auto;
}

.option {
    padding: 13px 18px;
    margin-bottom: 1px;
    cursor: pointer;
    color: black;
}

.option.selected,
.option:hover {
    background: #f0f0f0;
}

.placeholder {
    color: gray;
}

.selection.error .placeholder {
    color: #dc2018;
}
</style>
