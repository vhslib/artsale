<template>
  <Swiper
    :space-between="31"
    :height="810"
    :breakpoints="{
      320: {
        slidesPerView: 1,
        direction: 'horizontal'
      },
      500: {
        slidesPerView: 2,
        direction: 'horizontal'
      },
      900: {
        slidesPerView: 3,
        direction: 'horizontal'
      },
      992: {
        slidesPerView: 3,
        direction: 'vertical'
      }
    }"
  >
    <SwiperSlide>
      <Banner class="sidebar-banner" />
    </SwiperSlide>

    <SwiperSlide>
      <Banner class="sidebar-banner" />
    </SwiperSlide>

    <SwiperSlide>
      <Banner class="sidebar-banner" />
    </SwiperSlide>
  </Swiper>
</template>

<script lang="ts" setup>
import Banner from './Banner.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
</script>

<style scoped>
.sidebar-banner {
    margin-bottom: 30px;
}

@media (max-width:992px) {
    .sidebar-banner {
        margin-bottom: 0
    }
}
</style>
