<template>
  <form class="search-bar" @submit.prevent="onSubmit">
    <BaseSelect
      v-model="categoryId"
      class="category"
      :options="store.categories.map((c) => ({ id: c.id.toString(), text: c.name }))"
      placeholder="Категория"
      @update:model-value="onSubmit"
    />

    <BaseInput
      v-model="query"
      class="query"
      placeholder="Поиск по объявлениям"
    />

    <BaseButton kind="red" class="button">
      Найти
    </BaseButton>
  </form>
</template>

<script lang="ts" setup>
import BaseButton from './BaseButton.vue'
import BaseInput from './BaseInput.vue'
import BaseSelect from './BaseSelect.vue'
import { useRoute } from 'vue-router'
import { useSilentPush } from '../composables/silent-push.js'
import { useStore } from '../context.js'
import { getRouteParam, getRouteQuery } from '../router/helpers.js'
import { bind } from '../util/bind.js'
import { omitIfEmptyString } from '../util/omit-if-empty-string.js'
import { createSlug } from '../util/slug.js'
import { stringToNumber } from '../util/string-to-number.js'

const store = useStore()
const route = useRoute()

const { silentPush, shallowRefUpdatedExternally } = useSilentPush()

const query = shallowRefUpdatedExternally((route) => getRouteQuery(route, 'query')?.trim() ?? '')

const categoryId = shallowRefUpdatedExternally((route) => {
    if (route.name !== 'Search') {
        return
    }

    return bind(getRouteParam(route, 'category'), store.findCategoryBySlug)?.id.toString()
})

async function onSubmit() {
    await silentPush({
        name: 'Search',
        params: {
            category: bind(stringToNumber(categoryId.value), (id) => createSlug(store.findCategoryById(id)!.name)) ?? 'all'
        },
        query: {
            query: omitIfEmptyString(query.value),
            priceFrom: getRouteQuery(route, 'priceFrom'),
            priceTo: getRouteQuery(route, 'priceTo')
        }
    })
}
</script>

<style scoped>
.search-bar {
    display: flex;
    flex-direction: row;
    height: 48px;
}

.category {
    margin-right: 10px;
    width: 300px;
}

.query {
    background: url("data:image/svg+xml,%3Csvg width='15' height='15' viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M14 14L10.2857 10.2857M6.57143 12.1429C3.49441 12.1429 1 9.64844 1 6.57143C1 3.49441 3.49441 1 6.57143 1C9.64844 1 12.1429 3.49441 12.1429 6.57143C12.1429 9.64844 9.64844 12.1429 6.57143 12.1429Z' stroke='%231A1A47' stroke-opacity='0.4'/%3E%3C/svg%3E%0A") no-repeat 20px center;
    font-size: 14px;
    padding: 11px 13px 11px 46px;
    width: 100%;
    color: #1a1a47;
    margin-right: 10px;
}

.button {
    min-width: auto;
}

@media (max-width: 992px) {
    .category {
        width: 230px;
    }

    .button {
        display: none;
    }

    .query {
        font-size: 13px;
    }
}
</style>
