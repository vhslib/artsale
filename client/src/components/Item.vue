<template>
  <div ref="element" class="item">
    <div class="img-wrap">
      <RouterLink :to="resolveItemRoute(category, item)">
        <img :src="getStaticImageUrl(item.images[0]!, 'medium')" :alt="item.name" :title="item.name" />
      </RouterLink>
    </div>

    <div class="content">
      <RouterLink
        class="name"
        :to="resolveItemRoute(category, item)"
      >
        {{ item.name }}
      </RouterLink>

      <div class="price">
        {{ maskCurrency(item.price.toString()) }} ₽
      </div>

      <p class="description">
        {{ item.description.slice(0, 250) }}
      </p>

      <div class="time">
        {{ formatDate(item.datePublished) }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Item } from 'artsale-shared'
import { ref } from 'vue'
import { useStore } from '../context.js'
import { maskCurrency } from '../masks/currency.js'
import { resolveItemRoute } from '../pages/app/item.js'
import { getStaticImageUrl } from '../urls.js'
import { formatDate } from '../util/format-date.js'

interface Props {
    item: Item
}

const props = defineProps<Props>()
const store = useStore()

const category = store.findCategoryById(props.item.categoryId)!

const element = ref<HTMLElement | null>(null)
defineExpose({ element })
</script>

<style scoped>
.item {
    padding: 10px;
    transition: box-shadow .3s;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.item:hover {
    box-shadow: 0 4px 13px rgba(26, 26, 71, .2)
}

.img-wrap {
    max-height: 300px;
}

img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
}

.content {
    padding: 20px;
}

.name {
    font-size: 16px;
    color: #1a1a47;
    text-decoration: none;
    font-weight: 500;
    display: inline-block;
    min-height: 38px
}

.price {
    color: #fb0f47;
    font-weight: 600;
    font-size: 16px;
    letter-spacing: -.03em
}

.description {
    margin-top: 30px;
    margin-bottom: 10px;
    color: rgb(97, 97, 97);
}

.time {
    color: #1a1a47;
    margin-top: 4px;
    font-size: 12px;
    opacity: .5
}

@media (max-width:750px) {
    .item {
        padding: 0
    }

    .item:hover {
        box-shadow: none;
        padding: 0
    }

    .content {
        padding-left: 10px;
        padding-right: 10px
    }

    .price {
        margin-top: 3px
    }
}
</style>
