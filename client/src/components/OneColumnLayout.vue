<template>
  <div class="container">
    <div class="main">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.container {
    max-width: 100%;
    height: 100%;
    margin-top: 80px;
}

.main {
    min-width: 0;
    min-height: 0;
    width: 100%;
    overflow: visible;
    padding-right: 0;
}

@media (max-width: 992px) {
    .container {
        margin-top: 30px;
    }
}
</style>
