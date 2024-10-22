<template>
  <div class="slider">
    <Swiper
      :modules="[Navigation, Pagination]"
      loop
      navigation
      :pagination="{ clickable: true }"
    >
      <SwiperSlide v-for="i in 5" :key="i">
        <img class="image" src="/assets/img/front-banner.webp" />

        <div class="title">
          Как работает маркетплейс?
        </div>

        <div class="video-button" @click="isVideoOpen = true">
          Смотреть видео
        </div>
      </SwiperSlide>
    </Swiper>

    <VideoPopup :is-open="isVideoOpen" @close="isVideoOpen = false" />
  </div>
</template>

<script lang="ts" setup>
import VideoPopup from './VideoPopup.vue'
import { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { ref } from 'vue'

const isVideoOpen = ref(false)
</script>

<style scoped>
.slider :deep(.swiper-button-next),
.slider :deep(.swiper-button-prev) {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    cursor: pointer;
    margin-top: -19px;
    border: 1px solid #fff;
    transition: background .3s
}

.slider :deep(.swiper-button-next)::after,
.slider :deep(.swiper-button-prev)::after {
    display: block;
    content: '';
    width: 8px;
    left: 15px;
    height: 8px;
    background: 0 0;
    border-left: 1px solid #fff;
    border-top: 1px solid #fff;
    transform: translateY(-50%) rotate(-45deg);
    top: 50%;
    position: absolute;
    transition: border .3s
}

.slider :deep(.swiper-button-next):hover,
.slider :deep(.swiper-button-prev):hover {
    background: #fff
}

.slider :deep(.swiper-button-next):hover::after,
.slider :deep(.swiper-button-prev):hover::after {
    border-left: 1px solid #000;
    border-top: 1px solid #000
}

.slider :deep(.swiper-button-next) {
    transform: scale(-1)
}

.slider :deep(.swiper-pagination) .swiper-pagination-bullet {
    border-radius: 0;
    background: 0 0;
    opacity: 1;
    border: 1px solid #fff
}

.slider :deep(.swiper-pagination) .swiper-pagination-bullet-active,
.slider :deep(.swiper-pagination) .swiper-pagination-bullet:hover {
    background: #fff;
    box-shadow: 0 0 1px 0 #fff
}

.slider :deep(.swiper-slide) {
    height: 460px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center
}

.image {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    object-fit: cover;
    object-position: center;
    z-index: 1
}

.title {
    font-weight: 600;
    font-size: 24px;
    color: #fff;
    position: relative;
    z-index: 10
}

.video-button {
    background: #fb0f47;
    color: #fff;
    width: 86px;
    height: 86px;
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    z-index: 1;
    border-radius: 50%;
    text-align: center;
    cursor: pointer;
    display: flex;
    align-items: center;
    letter-spacing: -.03em;
    transition: transform .3s, background .3s;
    position: absolute;
    right: 15%;
    bottom: 15%
}

.video-button:hover {
    background: #d90c3c;
    transform: scale(1.1);
    -webkit-animation: pulse 2s;
    animation: pulse 2s
}

@keyframes pulse {
    0% {
        box-shadow: 0 0 0 0 rgba(251, 15, 71, .4)
    }
    70% {
        box-shadow: 0 0 0 30px transparent
    }
    to {
        box-shadow: 0 0 0 0 transparent
    }
}

@media (max-width:992px) {
    .slider :deep(.swiper-button-next),
    .slider :deep(.swiper-button-prev) {
        width: 28px;
        height: 28px;
        margin-top: -14px
    }
    .slider :deep(.swiper-button-next)::after,
    .slider :deep(.swiper-button-prev)::after {
        left: 11px
    }
    .slider :deep(.swiper-slide) {
        height: calc(100vw*.4138);
        min-height: 150px
    }
    .title {
        font-size: 14px;
        line-height: 17px
    }
}

@media (max-width:768px) {
    .video-button {
        font-size: 5px;
        width: 40px;
        height: 40px;
        line-height: 6px;
        right: 51px;
        bottom: 19px
    }
}
</style>
