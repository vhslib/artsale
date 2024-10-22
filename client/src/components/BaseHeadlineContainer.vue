<template>
  <div>
    <div class="headline-row">
      <div class="headline">
        {{ headline }}
      </div>

      <slot name="header" />
    </div>

    <slot />
  </div>
</template>

<script lang="ts" setup>
interface Props {
    headline: string
}

defineProps<Props>()
</script>

<style scoped>
.headline-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 15px;
}

.headline {
    font-weight: 500;
    font-size: 14px;
    margin-right: auto
}
</style>
