<template>
  <div class="loading-container" :class="{ visible: isVisible }">
    <div class="loader" :style="{ width: progress + '%' }">
      <div class="light" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { random } from 'lodash-es'
import { onMounted, ref } from 'vue'
import { useContext } from '../context.js'

// Assume that loading will complete under this amount of time.
const DEFAULT_DURATION = 300

// How frequently to update
const DEFAULT_INTERVAL = 40

// 0 - 1. Add some variation to how much the bar will grow at each interval
const VARIATION = 0.5

// 0 - 100. Where the progress bar should start from.
const STARTING_POINT = 0

// Limiting how far the progress bar will get to before loading is complete
const ENDING_POINT = 98

// Milliseconds before the bar is shown
const SHOW_TIMEOUT = 100

// Milliseconds before the bar is hidden, after the progress reaches 100
const HIDE_TIMEOUT = 100

let isLoading = false
const isVisible = ref(false)
const progress = ref(STARTING_POINT)

function start() {
    isLoading = true

    setTimeout(() => {
        if (!isLoading) {
            return
        }

        isVisible.value = true
        progress.value = STARTING_POINT
        loop()
    }, SHOW_TIMEOUT)
}

let timeoutId: NodeJS.Timeout | undefined

function loop() {
    if (timeoutId) {
        clearTimeout(timeoutId)
    }

    if (progress.value >= ENDING_POINT) {
        return
    }

    const size = (ENDING_POINT - STARTING_POINT) / (DEFAULT_DURATION / DEFAULT_INTERVAL)
    const p = Math.round(progress.value + random(size * (1 - VARIATION), size * (1 + VARIATION)))
    progress.value = Math.min(p, ENDING_POINT)

    timeoutId = setTimeout(
        loop,
        random(DEFAULT_INTERVAL * (1 - VARIATION), DEFAULT_INTERVAL * (1 + VARIATION))
    )
}

function stop() {
    isLoading = false
    progress.value = 100
    clearTimeout(timeoutId)

    setTimeout(() => {
        if (isLoading) {
            return
        }

        isVisible.value = false
    }, HIDE_TIMEOUT)
}

const context = useContext()

onMounted(() => {
    context.eventBus.on('componentLoadingStarted', start)
    context.eventBus.on('componentLoadingFinished', stop)

    return () => {
        context.eventBus.off('componentLoadingStarted', start)
        context.eventBus.off('componentLoadingFinished', stop)
    }
})
</script>

<style scoped>
.loading-container {
    font-size: 0; /* remove space */
    position: fixed;
    top: 0;
    left: 0;
    height: 2px;
    width: 100%;
    display: none;
    z-index: 100;
}

.loading-container.visible {
    display: block;
}

.loader {
    background: #ff0015;
    box-shadow: 0 0 4px 0 rgba(255, 0, 79, 0.79);
    display: inline-block;
    height: 100%;
    width: 50%;
    overflow: hidden;
    transition: 200 width ease-out;
}

.light {
    float: right;
    height: 100%;
    width: 20%;
    background-image: linear-gradient(to right, #ff0015, #c2c2c2, #ff0015);
    animation: loading-animation 2s ease-in infinite;
}

@keyframes loading-animation {
    0% {
        margin-right: 100%;
    }

    50% {
        margin-right: 100%;
    }

    100% {
        margin-right: -10%;
    }
}
</style>
