<template>
  <div class="menu">
    <div class="links">
      <RouterLink :to="{ name: 'About' }" class="link">
        О компании
      </RouterLink>

      <RouterLink :to="{ name: 'Contacts' }" class="link">
        Контакты
      </RouterLink>

      <RouterLink :to="{ name: 'About' }" class="link">
        Информация
      </RouterLink>

      <RouterLink :to="{ name: 'Contacts' }" class="link">
        Для инвесторов
      </RouterLink>
    </div>

    <RouterLink v-slot="{ href, navigate }" :to="{ name: 'Profile.NewItem' }" custom>
      <BaseButton link kind="red" small :href="href" @click="navigate">
        Подать объявление
      </BaseButton>
    </RouterLink>
  </div>
</template>

<script lang="ts" setup>
import BaseButton from './BaseButton.vue'
</script>

<style scoped>
.menu {
    background: rgba(26, 26, 71, .05);
    padding: 10px 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
}

@media (max-width: 993px) {
    .menu {
        display: none;
    }
}

.links {
    margin-right: auto;
}

.link {
    margin-right: 18px;
    display: inline-block;
    font-size: 12px;
    text-decoration: none;
    color: #1a1a47;
    transition: color 0.3s;
}

.link:hover {
    color: #fb0f47;
}
</style>
