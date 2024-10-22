<template>
  <div class="button-wrap">
    <input
      ref="element"
      type="file"
      accept="image/png, image/jpeg, image/webp"
      multiple
      title=""
      @change="onChange"
      @blur="validation?.touch()"
    />

    <div class="button" :class="{ error: validation?.isError() }">
      {{ text }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { FieldValidation } from '../composables/field-validation.js'
import { showInfoModal } from '../modals/info-modal.js'
import { bytesToMegabytes } from '../util/bytes-to-megabytes.js'

interface ImageEntry {
    id: number
    url: string
}

interface Props {
    text: string
    modelValue: ImageEntry[]
    validation?: FieldValidation
}

interface Emits {
    (e: 'update:modelValue', value: ImageEntry[]): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const element = ref<HTMLInputElement | null>(null)

async function onChange() {
    const files = Array.from(element.value!.files!)

    if (props.modelValue.length + files.length > 10) {
        await showInfoModal({ message: 'Слишком много файлов' })
        return
    }

    const newEntries = await Promise.all(files.map(processFile))

    emit('update:modelValue', [...props.modelValue, ...newEntries])
}

let uniqueId = 0

async function processFile(file: File) {
    if (bytesToMegabytes(file.size) > 25) {
        await showInfoModal({ message: 'Слишком большой файл' })
    }

    const id = ++uniqueId
    const url = await readFileToBase64(file)

    return { id, url }
}

function readFileToBase64(file: File) {
    const reader = new FileReader()
    reader.readAsDataURL(file)

    return new Promise<string>((resolve, reject) => {
        reader.onload = () => {
            const url = reader.result

            if (typeof url !== 'string') {
                reject(new Error('It is not a string bro'))
                return
            }

            resolve(url)
        }
    })
}
</script>

<style scoped>
input {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
    cursor: pointer
}

.button-wrap {
    position: relative;
    width: 100%;
}

.button {
    border: 1px solid #c5c5d1;
    background: #f4f4f6;
    font-size: 14px;
    margin-top: 15px;
    padding: 15px 23px 15px 20px;
    user-select: none;
}

.button::after {
    background: url("data:image/svg+xml,%3Csvg width='13' height='13' viewBox='0 0 13 13' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6.5 0V13M0 6.5H13' stroke='%231A1A47'/%3E%3C/svg%3E%0A");
    content: '';
    width: 13px;
    height: 13px;
    display: inline-block;
    margin-left: 10px;
    position: absolute;
    top: 19px;
    right: 19px;
}

.button.error {
    background-color: white;
    border: 1px solid #dc2018;
    color: #dc2018
}
</style>
