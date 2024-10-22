<template>
  <h1>{{ author.firstName }} {{ author.lastName }}: объявления пользователя</h1>

  <TwoColumnLayout>
    <template #main>
      <p v-if="items.length === 0" class="no-items">
        У пользователя нет объявлений
      </p>

      <div v-else class="grid _gap-x-30">
        <Item
          v-for="item in items"
          :key="item.id"
          :item="item"
          class="col-md-4"
        />
      </div>
    </template>

    <template #sidebar>
      <BannerBlock />
    </template>
  </TwoColumnLayout>
</template>

<script lang="ts" setup>
import BannerBlock from '../../components/BannerBlock.vue'
import Item from '../../components/Item.vue'
import TwoColumnLayout from '../../components/TwoColumnLayout.vue'
import type { ItemsGetByAuthorOkResponse } from 'artsale-shared'
import { useTitle } from '../../composables/title.js'
import { usePageData } from '../../context.js'

const { author, items } = usePageData<ItemsGetByAuthorOkResponse>()
useTitle(`${author.firstName} ${author.lastName}: объявления пользователя`)
</script>

<style scoped>
.no-items {
    font-size: 16px;
}
</style>
