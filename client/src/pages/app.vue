<template>
  <div class="wrapper">
    <Menu />
    <Header />

    <main>
      <div class="inner">
        <RouterView />
      </div>
    </main>

    <Footer />
  </div>
</template>

<script lang="ts" setup>
import Footer from '../components/Footer.vue'
import Header from '../components/Header.vue'
import Menu from '../components/Menu.vue'
</script>

<style scoped>
.wrapper {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    width: 100%;
}

main {
    flex: 1;
}

.inner {
    max-width: 1340px;
    padding: 0 20px;
    margin-left: auto;
    margin-right: auto;
}
</style>
