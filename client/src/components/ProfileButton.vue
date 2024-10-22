<template>
  <RouterLink :to="{ name: 'Profile.Info' }" class="link">
    {{
      store.profileData
        ? `${store.profileData.firstName} ${store.profileData.lastName}`
        : 'Вход и регистрация'
    }}
  </RouterLink>
</template>

<script lang="ts" setup>
import { useStore } from '../context.js'

const store = useStore()
</script>

<style scoped>
.link {
    background: url("data:image/svg+xml,%3Csvg width='14' height='15' viewBox='0 0 14 15' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13.5 14C13.5 11 11.1569 9.99414 9.5 9.99414H5C3.34315 9.99414 1 11 1 14M10.5 3.99804C10.5 5.65396 9.157 6.99609 7.5 6.99609C5.843 6.99609 4.5 5.65396 4.5 3.99804C4.5 2.34212 5.843 1 7.5 1C9.157 1 10.5 2.34212 10.5 3.99804Z' stroke='%23FB0F47' stroke-linecap='square'/%3E%3C/svg%3E%0A") no-repeat top center;
    font-style: 12px;
    padding-top: 20px;
    color: #000;
    text-decoration: none;
    cursor: pointer;
    transition: 0.3s color;
}

.link:hover {
    color: #fb0f47;
}
</style>
