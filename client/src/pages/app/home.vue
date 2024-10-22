<template>
  <HomeSlider class="home-slider" />

  <Swiper
    class="banner-top"
    :space-between="31"
    :breakpoints="{
      320: {
        slidesPerView: 1
      },
      500: {
        slidesPerView: 2
      },
      900: {
        slidesPerView: 3
      }
    }"
  >
    <SwiperSlide>
      <Banner />
    </SwiperSlide>

    <SwiperSlide>
      <Banner />
    </SwiperSlide>

    <SwiperSlide>
      <Banner />
    </SwiperSlide>
  </Swiper>

  <TwoColumnLayout>
    <template #main>
      <HomeItemsSlider
        v-for="category in categoriesWithItems"
        :key="category.id"
        :category="category"
        :items="category.items"
      />
    </template>

    <template #sidebar>
      <BannerBlock />
    </template>
  </TwoColumnLayout>
</template>

<script lang="ts" setup>
import Banner from '../../components/Banner.vue'
import BannerBlock from '../../components/BannerBlock.vue'
import HomeItemsSlider from '../../components/HomeItemsSlider.vue'
import HomeSlider from '../../components/HomeSlider.vue'
import TwoColumnLayout from '../../components/TwoColumnLayout.vue'
import type { ItemsSearchResponse } from 'artsale-shared'
import { iterate } from 'iterare'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { useTitle } from '../../composables/title.js'
import { usePageData, useStore } from '../../context.js'

useTitle('Главная')

const store = useStore()
const { items } = usePageData<ItemsSearchResponse>()

const categoriesWithItems = iterate(store.categories)
    .map((category) => {
        const categoryItems = iterate(items)
            .filter((item) => item.categoryId === category.id)
            .take(20)
            .toArray()

        return {
            ...category,
            items: categoryItems
        }
    })
    .filter((category) => category.items.length !== 0)
    .toArray()
</script>

<style scoped>
.home-slider {
    margin-bottom: 30px;
}

.banner-top {
    margin-bottom: 30px;
}
</style>
