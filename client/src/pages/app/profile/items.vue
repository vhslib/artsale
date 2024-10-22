<template>
  <div class="filters">
    <button
      :class="{ active: currentFilter === 'ALL' }"
      @click="currentFilter = 'ALL'"
    >
      Все
    </button>

    <button
      :class="{ active: currentFilter === 'ACTIVE' }"
      @click="currentFilter = 'ACTIVE'"
    >
      Активные
    </button>

    <button
      :class="{ active: currentFilter === 'INACTIVE' }"
      @click="currentFilter = 'INACTIVE'"
    >
      Неактивные
    </button>
  </div>

  <template v-if="visibleItems.length !== 0">
    <ProfileItem
      v-for="item in visibleItems"
      :key="item.id"
      class="item"
      :item="item"
      @deactivate="onDeactivate(item)"
      @activate="onActivate(item)"
      @delete="onDelete(item)"
    />
  </template>

  <div v-else class="no-items">
    Нет объявлений
  </div>
</template>

<script lang="ts" setup>
import ProfileItem from '../../../components/ProfileItem.vue'
import type { Item, ItemsMyResponse } from 'artsale-shared'
import { computed, ref } from 'vue'
import { useTitle } from '../../../composables/title.js'
import { useApi, usePageData } from '../../../context.js'
import { showConfirmModal } from '../../../modals/confirm-modal.js'

useTitle('Мои объявления')

const api = useApi()
const items = ref(usePageData<ItemsMyResponse>().items)

const currentFilter = ref<'ALL' | 'ACTIVE' | 'INACTIVE'>('ALL')

function satisfiesFilter({ status }: Item) {
    switch (currentFilter.value) {
        case 'ALL': return true
        case 'ACTIVE': return status === 'ACTIVE'
        case 'INACTIVE': return status === 'INACTIVE'
    }
}

const visibleItems = computed(() => items.value.filter(satisfiesFilter))

async function onDeactivate(item: Item) {
    const success = await showConfirmModal({
        message: 'Вы уверены, что хотите деактивировать это объявление?',
        title: 'Деактивировать объявление'
    })

    if (!success) {
        return
    }

    await api.post('/items/deactivate', {
        itemId: item.id
    })

    item.status = 'INACTIVE'
}

async function onActivate(item: Item) {
    await api.post('/items/activate', {
        itemId: item.id
    })

    item.status = 'ACTIVE'
}

async function onDelete(item: Item) {
    const success = await showConfirmModal({
        message: 'Вы уверены, что хотите удалить это объявление?',
        title: 'Удалить объявление'
    })

    if (!success) {
        return
    }

    await api.post('/items/delete', {
        itemId: item.id
    })

    items.value.splice(items.value.indexOf(item), 1)
}
</script>

<style scoped>
.filters {
    list-style: none;
    display: flex;
    margin: 0 -20px 51px;
    padding: 0 20px;
    overflow: auto
}

.filters button {
    background: 0 0;
    border: 0 solid;
    padding: 0;
    cursor: pointer;
    padding-right: 40px;
    font-weight: 500;
    font-size: 20px;
    text-decoration: none;
    color: #1a1a47
}

.filters button.active {
    color: #fb0f47
}

.item {
    margin-bottom: 50px;
}

.no-items {
    font-size: 16px;
    margin-bottom: 50px;
}

@media (max-width: 850px) {
    .filters {
        margin-bottom: 35px
    }

    .no-items {
        font-size: 14px;
    }
}

@media (max-width: 690px) {
    .filters button {
        font-size: 15px;
        padding-right: 20px;
    }
}
</style>
