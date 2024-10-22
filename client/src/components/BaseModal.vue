<template>
  <div ref="root" class="modal" :class="{ open: isOpen }" tabindex="0" @keydown.escape="$emit('close')">
    <div class="overlay" @click="$emit('close')" />

    <div class="content">
      <div class="close" @click="$emit('close')" />
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, ref, watch } from 'vue'
import { getActiveHtmlElement } from '../util/active-element.js'

interface Props {
    isOpen: boolean
}

interface Emits {
    (e: 'close'): void
}

const props = defineProps<Props>()
defineEmits<Emits>()

// Gonna focus it on open
const root = ref<HTMLElement | null>(null)

// Element to restore focus on close
let activeElement: HTMLElement | undefined

watch(
    () => props.isOpen,
    async () => {
        if (props.isOpen) {
            activeElement = getActiveHtmlElement()
            await nextTick()
            root.value!.focus()
        }
        else {
            activeElement?.focus()
        }
    },
    { immediate: true }
)
</script>

<style scoped>
.modal {
    display: none;
}

.modal.open {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1210;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    padding: 55px 20px 20px;
    background: rgba(18, 18, 18, .6);
}

.overlay {
    cursor: pointer;

    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}

.close {
    background: url("data:image/svg+xml,%3Csvg width='33' height='33' viewBox='0 0 33 33' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0.899902 0.899902L32.0999 32.0999M0.899902 32.0999L32.0999 0.899902' stroke='white' stroke-width='2'/%3E%3C/svg%3E%0A") no-repeat center;
    right: -47px;
    top: -47px;
    position: absolute;
    width: 33px;
    height: 33px;
    cursor: pointer;
    transition: transform 0.3s;
}

.close:hover {
    transform: scale(1.3);
}

.content {
    background: #fff;

    position: relative;
    width: 9000px;
    min-height: 407px;
    max-width: 557px;
    padding: 60px 60px 30px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

@media (max-width: 1200px) {
    .close {
        right: 0;
    }

    .content {
        padding: 30px;
    }
}

@media (max-width: 650px) {
    .content {
        max-width: 100%;
    }
}
</style>
