<template>
  <TwoColumnLayout>
    <template #main>
      <h1>Админка</h1>

      <div class="admin">
        <div class="menu">
          <RouterLink :to="{ name: 'Admin.Categories' }" class="link" active-class="active">
            Категории
          </RouterLink>
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
import TwoColumnLayout from '../../components/TwoColumnLayout.vue'
</script>

<style scoped>
h1 {
    display: inline-block;
    margin-right: 30px;
}

.admin {
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

/* eslint-disable-next-line vue-scoped-css/require-selector-used-inside */
.menu .link.active,
.menu .link:hover {
    color: #fb0f47
}

@media (max-width:850px) {
    .admin {
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
</style>
