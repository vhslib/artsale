<template>
  <TwoColumnLayout>
    <template #main>
      <div>
        <h1>Личный кабинет</h1>

        <RouterLink
          v-if="$route.name !== 'Profile.NewItem'"
          v-slot="{ href, navigate }"
          :to="{ name: 'Profile.NewItem' }"
          custom
        >
          <BaseButton class="new-item-button" link kind="red" small :href="href" @click="navigate">
            Создать объявление
          </BaseButton>
        </RouterLink>
      </div>

      <div class="profile">
        <div class="menu">
          <RouterLink :to="{ name: 'Profile.NewItem' }" class="link" active-class="active">
            Создать объявление
          </RouterLink>

          <RouterLink :to="{ name: 'Profile.Items' }" class="link" active-class="active">
            Мои объявления
          </RouterLink>

          <RouterLink :to="{ name: 'Profile.Info' }" class="link" active-class="active">
            Мои данные
          </RouterLink>

          <RouterLink :to="{ name: 'Profile.Chats' }" class="link" active-class="active">
            Мои диалоги
          </RouterLink>

          <RouterLink v-if="store.profileData!.role === 'ADMIN'" :to="{ name: 'Admin.Categories' }" class="link link-admin">
            Админка
          </RouterLink>

          <div class="logout" @click="logout">
            Выйти из профиля
          </div>
        </div>

        <div class="content">
          <RouterView />
        </div>
      </div>
    </template>

    <template #sidebar>
      <BannerBlock />
    </template>
  </TwoColumnLayout>
</template>

<script lang="ts" setup>
import BannerBlock from '../../components/BannerBlock.vue'
import BaseButton from '../../components/BaseButton.vue'
import TwoColumnLayout from '../../components/TwoColumnLayout.vue'
import { useRouter } from 'vue-router'
import { useStore } from '../../context.js'

const store = useStore()
const router = useRouter()

async function logout() {
    store.logout()
    await router.replace({ name: 'Login' })
}
</script>

<style scoped>
h1 {
    display: inline-block;
    margin-right: 30px;
}

.new-item-button {
    position: relative;
    top: -5px;
}

.profile {
    display: flex;
    flex-direction: row
}

.menu {
    max-width: 200px;
    padding-right: 30px;
    width: 100%
}

.content {
    flex: 1
}

.menu .link {
    display: block;
    font-size: 14px;
    line-height: 17px;
    color: #1a1a47;
    text-decoration: none;
    margin-bottom: 20px;
}

.menu .link-admin {
    font-weight: bold;
}

/* eslint-disable-next-line vue-scoped-css/require-selector-used-inside */
.menu .link.active,
.menu .link:hover {
    color: #fb0f47
}

@media (max-width:850px) {
    .profile {
        flex-wrap: wrap
    }

    .menu {
        padding-right: 0;
        padding-top: 10px;
        padding-bottom: 10px;
        width: 100%;
        max-width: 100%
    }
}

.logout {
    color: #fb0f47;
    cursor: pointer;
    text-decoration: underline;
    margin-top: 30px;
}
</style>
