<template>
  <div class="item" :class="item.status === 'ACTIVE' ? 'active' : 'inactive'">
    <div class="img-wrap">
      <RouterLink :to="resolveItemRoute(category, item)">
        <img :src="getStaticImageUrl(item.images[0]!, 'big')" />
      </RouterLink>
    </div>

    <div class="content">
      <div class="head-row">
        <div class="date">
          {{ formatDate(item.datePublished) }}
        </div>

        <RouterLink :to="{ name: 'Profile.UpdateItem', params: { itemId: item.id } }" class="update-link">
          Редактировать
        </RouterLink>
      </div>

      <div class="title">
        <RouterLink :to="resolveItemRoute(category, item)" class="title-link">
          {{ item.name }}
        </RouterLink>
      </div>

      <div class="price">
        {{ item.price }} ₽
      </div>

      <div class="buttons">
        <template v-if="item.status === 'ACTIVE'">
          <BaseButton kind="red" small class="button" @click="$emit('deactivate')">
            Деактивировать
          </BaseButton>
        </template>

        <template v-if="item.status === 'INACTIVE'">
          <BaseButton kind="red" small class="button" @click="$emit('activate')">
            Активировать
          </BaseButton>

          <BaseButton kind="red" small class="button" @click="$emit('delete')">
            Удалить
          </BaseButton>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import BaseButton from './BaseButton.vue'
import type { Item } from 'artsale-shared'
import { useStore } from '../context.js'
import { resolveItemRoute } from '../pages/app/item.js'
import { getStaticImageUrl } from '../urls.js'
import { formatDate } from '../util/format-date.js'

interface Props {
    item: Item
}

interface Emits {
    (e: 'deactivate'): void
    (e: 'activate'): void
    (e: 'delete'): void
}

const props = defineProps<Props>()
defineEmits<Emits>()

const store = useStore()
const category = store.findCategoryById(props.item.categoryId)!
</script>

<style scoped>
.item {
    display: flex;
    width: 100%;
    flex-direction: row
}

.item.inactive .img-wrap,
.item.inactive .price,
.item.inactive .title {
    opacity: .5
}

.img-wrap {
    max-width: 290px
}

.content {
    flex: 1;
    padding-left: 40px
}

img {
    width: 100%
}

.head-row {
    display: flex;
    padding-top: 5px;
    flex-direction: row;
    margin-bottom: 24px;
    align-items: center
}

.date {
    color: #8c8ca3;
    font-size: 12px;
    margin-right: 15px;
}

.title {
    font-weight: 500;
    font-size: 16px;
    line-height: 137%;
    margin-bottom: 10px;
}

.title .title-link {
    text-decoration: none;
    color: inherit;
}

.price {
    font-weight: 600;
    font-size: 16px;
    line-height: 150%;
    color: #fb0f47
}

.buttons {
    margin-top: 29px
}

.button {
    margin-right: 20px;
}

.update-link {
    font-size: 12px;
}

@media (max-width:690px) {
    .item {
        flex-direction: column;
        margin-bottom: 30px
    }

    .img-wrap {
        max-width: 100%;
        max-height: 200px;
        height: 200px;
        position: relative;
        margin-bottom: 10px
    }

    img {
        -o-object-position: center;
        object-position: center;
        -o-object-fit: contain;
        object-fit: contain;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%
    }

    .content {
        padding-left: 0
    }
}
</style>
