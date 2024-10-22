<template>
  <div>ArtSale.ru</div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'

onMounted(() => {
    document.body.classList.add('dummy-body')
})
</script>

<style>
.dummy-body {
    background-color: #00BCD4;
    position: relative;
}
</style>

<style scoped>
div {
    font: bold 150px serif;
    color: #fff;
    text-shadow: 2px 2px 6px #000;
    position: absolute;
    top: 30%;
    width: 100%;
    text-align: center;
}
</style>
