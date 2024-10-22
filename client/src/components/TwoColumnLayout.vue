<template>
  <div class="container">
    <div class="main">
      <slot name="main" />
    </div>

    <div class="sidebar">
      <slot name="sidebar" />
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
    sidebarMaxWidth?: number
}

withDefaults(defineProps<Props>(), { sidebarMaxWidth: 250 })
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: row;
    max-width: 100%;
    height: 100%;
    margin-top: 20px;
}

.main {
    padding-right: 70px;
    min-width: 0;
    min-height: 0;
    width: 100%
}

.sidebar {
    max-width: v-bind('sidebarMaxWidth + "px"');
    min-height: 0;
    width: 100%;
}

@media (max-width: 992px) {
    .container {
        flex-direction: column;
        margin-top: 30px
    }

    .main {
        padding-right: 0;
        overflow: visible;
        margin-bottom: 20px
    }

    .sidebar {
        min-width: 100%;
        margin-bottom: 30px
    }
}
</style>
