<template>
  <div class="popup" :class="{ open: isOpen }">
    <video ref="video" preload="metadata">
      <source src="/assets/video/front-banner-1280.mp4" type="video/mp4" />
    </video>

    <div class="close-button" @click="$emit('close')" />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

interface Props {
    isOpen: boolean
}

interface Emits {
    (e: 'close'): void
}

const props = defineProps<Props>()
defineEmits<Emits>()

const video = ref<HTMLVideoElement | null>(null)

watch(
    () => props.isOpen,
    async () => {
        if (props.isOpen) {
            await video.value!.play()
        }
        else {
            video.value!.pause()
        }
    }
)
</script>

<style scoped>
video {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    -o-object-fit: contain;
    object-fit: contain
}

.popup {
    position: fixed;
    display: none;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .85);
    z-index: 100
}

.popup.open {
    display: block
}

.close-button {
    position: absolute;
    right: 0;
    top: 0;
    width: 39px;
    cursor: pointer;
    height: 40px;
    transition: transform .3s
}

.close-button:hover {
    transform: scale(1.1)
}

.close-button::after,
.close-button::before {
    content: '';
    display: block;
    height: 2px;
    width: 100%;
    background: #fff;
    border-radius: 2px;
    left: 0;
    top: 20px;
    position: absolute
}

.close-button::after {
    transform: rotate(-45deg)
}

.close-button::before {
    transform: rotate(45deg)
}
</style>
