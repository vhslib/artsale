<template>
  <div class="slider">
    <div class="head">
      <h2>
        {{ category.name }}
      </h2>

      <RouterLink class="link-all" :to="{ name: 'Search', params: { category: createSlug(category.name) } }">
        Все товары
      </RouterLink>
    </div>

    <div class="wrapper">
      <div class="padding">
        <Swiper
          :modules="[Navigation]"
          navigation
          :space-between="20"
          :breakpoints="{
            0: {
              slidesPerView: 1.5
            },
            480: {
              slidesPerView: 2.5
            },
            750: {
              spaceBetween: 5,
              slidesPerView: 3
            }
          }"
        >
          <SwiperSlide v-for="item in items" :key="item.id" class="slide">
            <Item ref="refs" :item="item" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Item from './Item.vue'
import type { Category, Item as ItemModel } from 'artsale-shared'
import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { onMounted, ref } from 'vue'
import { createSlug } from '../util/slug.js'

interface Props {
    category: Category
    items: ItemModel[]
}

defineProps<Props>()

const refs = ref<InstanceType<typeof Item>[]>([])

onMounted(() => {
    const elements: HTMLElement[] = refs.value.map((instance) => instance.element!)
    const heights = elements.map((element) => element.clientHeight)
    const maxHeight = Math.max(...heights)

    for (const element of elements) {
        element.style.height = `${maxHeight}px`
    }
})
</script>

<style scoped>
.slide {
    padding-bottom: 10px;
    height: auto !important;
}

.wrapper {
    padding: 0 20px;
    position: relative
}

.slider :deep(.swiper-button-next)::after,
.slider :deep(.swiper-button-prev)::after {
    content: '';
    border-left: 1px solid #121212;
    border-top: 1px solid #121212;
    transform: rotate(-45deg);
    width: 13px;
    height: 13px
}

.slider :deep(.swiper-button-prev) {
    left: 0
}

.slider :deep(.swiper-button-next) {
    right: 0;
    transform: scale(-1)
}

.padding {
    padding: 0 10px;
    overflow: hidden
}

.slider {
    width: 100%;
    overflow: visible;
    padding: 10px 0 15px;
    max-width: 100%
}

.head {
    flex-direction: row;
    display: flex;
    position: relative;
    align-items: center;
    margin-bottom: 15px;
    padding-right: 3px
}

.head::before {
    position: absolute;
    left: 200px;
    top: 24px;
    width: calc(100% - 350px);
    border-top: 1px solid rgba(26, 26, 71, .6);
    display: block;
    content: "";
    z-index: -1
}

h2 {
    font-weight: 600;
    font-size: 24px;
    line-height: 133%;
    background: #fff;
    padding-right: 20px;
    margin: 0 auto 0 0;
    text-transform: uppercase
}

.link-all {
    font-weight: 600;
    font-size: 18px;
    padding-left: 20px;
    color: #fb0f47;
    background: #fff;
    cursor: pointer;
    text-decoration: none;
    transform: color .3s
}

.link-all:hover {
    color: #d90c3c
}

.link-all::after {
    display: inline-block;
    position: relative;
    border-right: 1px solid;
    border-top: 1px solid;
    border-color: #fb0f47;
    content: "";
    margin-left: 16px;
    width: 8px;
    transform: rotate(45deg);
    height: 8px
}

@media (max-width:750px) {
    .wrapper {
        padding: 0;
        margin-right: -20px
    }

    .slider :deep(.swiper-button-next),
    .slider :deep(.swiper-button-prev) {
        display: none!important
    }

    .padding {
        padding: 0
    }

    .head::before {
        display: none
    }

    h2 {
        font-size: 18px
    }

    .link-all {
        font-size: 14px
    }
}
</style>
