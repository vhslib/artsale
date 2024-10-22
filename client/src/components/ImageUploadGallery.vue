<template>
  <div class="images">
    <div v-for="{ id, url } in modelValue" :key="id" class="image-wrap">
      <div class="close-button" @click="onRemove(id)" />
      <img class="image" :src="url" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ImageEntry } from '../entities/image-entry.js'

interface Props {
    modelValue: ImageEntry[]
}

interface Emits {
    (e: 'update:modelValue', value: ImageEntry[]): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

function onRemove(id: number) {
    emit('update:modelValue', props.modelValue.filter((e) => e.id !== id))
}
</script>

<style scoped>
.images {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 10px;
}

@media (max-width:850px) {
    .images {
        grid-template-columns: 1fr 1fr
    }
}

.image-wrap {
    position: relative;
    padding-bottom: 83.96%;
    overflow: hidden
}

.image, .close-button {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%
}

.image {
    object-fit: cover;
    object-position: center;
    z-index: 2
}

.close-button {
    opacity: 0;
    transition: opacity .3s, transform .5s;
    cursor: pointer;
    background: rgba(0, 0, 0, .5);
    z-index: 3
}

.close-button:hover {
    opacity: 1
}

.close-button::before {
    transform: translateX(-50%) translateY(-50%) rotate(45deg)
}

.close-button::after {
    transform: translateX(-50%) translateY(-50%) rotate(-45deg)
}

.close-button::after,
.close-button::before {
    display: block;
    width: 50px;
    height: 3px;
    background: #fb1047;
    content: "";
    position: absolute;
    top: 50%;
    left: 50%
}
</style>
