<template>
  <TwoColumnLayout>
    <template #main>
      <div class="grid detail-grid">
        <div class="gallery col-lg-6">
          <Swiper :modules="[Navigation]" navigation>
            <SwiperSlide v-for="image in item.images" :key="image" class="slide">
              <img :src="getStaticImageUrl(image, 'medium')" :alt="item.name" :title="item.name" />
            </SwiperSlide>
          </Swiper>
        </div>

        <div class="col-lg-6">
          <div class="info-head">
            <div class="info-author">
              Автор:

              <RouterLink :to="{ name: 'UserItems', params: { userId: author.id } }">
                {{ author.firstName }} {{ author.lastName }}
              </RouterLink>
            </div>

            <div>
              {{ formatDate(item.datePublished) }}
            </div>
          </div>

          <h1 class="info-title">
            {{ item.name }}
          </h1>

          <div class="info-price">
            {{ maskCurrency(item.price.toString()) }} ₽
          </div>

          <div v-if="!store.profileData">
            Для связи с продавцом

            <RouterLink :to="{ name: 'Login' }">
              войдите
            </RouterLink>

            или

            <RouterLink :to="{ name: 'Register' }">
              зарегистрируйтесь
            </RouterLink>
          </div>

          <div v-else-if="!store.profileData.emailConfirmed || !store.profileData.phoneConfirmed">
            Для связи с продавцом

            <RouterLink :to="{ name: 'Profile.Info' }">
              подтвердите почту и телефон
            </RouterLink>
          </div>

          <div v-else-if="author.id === store.profileData.id">
            Это ваше объявление
          </div>

          <div v-else class="call-wrap">
            <BaseButton kind="red" class="call-button" @click="onCallButtonClick">
              Связаться с продавцом
            </BaseButton>
          </div>
        </div>
      </div>

      <h2>Описание</h2>

      <div class="description">
        <p>
          {{ item.description }}
        </p>
      </div>

      <h3>Характеристики</h3>

      <div class="parameter-row">
        <div v-for="[propertyName, propertyValue] in properties" :key="propertyName" class="parameter">
          <div class="parameter-head">
            {{ propertyName }}
          </div>

          <div class="parameter-body">
            {{ propertyValue }}
          </div>
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
import BaseButton from '../../components/BaseButton.vue'
import TwoColumnLayout from '../../components/TwoColumnLayout.vue'
import type { ItemsGetByIdOkResponse } from 'artsale-shared'
import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { useRouter } from 'vue-router'
import { useMeta } from '../../composables/meta.js'
import { useTitle } from '../../composables/title.js'
import { useApi, usePageData, useStore } from '../../context.js'
import { maskCurrency } from '../../masks/currency.js'
import { showContactUserModal } from '../../modals/contact-user-modal.js'
import { getStaticImageUrl } from '../../urls.js'
import { formatDate } from '../../util/format-date.js'
import { tuple } from '../../util/tuple.js'

const store = useStore()
const router = useRouter()
const api = useApi()
const { author, item } = usePageData<ItemsGetByIdOkResponse>()

useTitle(item.name)
useMeta('description', item.description.slice(0, 160))

const category = store.findCategoryById(item.categoryId)!

const properties = [
    tuple('Категория', category.name),
    ...item.properties.map(([id, value]) => {
        const property = category.properties.find((p) => p.id === id)!

        if (Array.isArray(value)) {
            return tuple(property.name, value.join(', '))
        }

        return tuple(property.name, value)
    })
]

async function goToDialogWithThem() {
    await router.push({ name: 'Profile.Chat', params: { userId: author.id } })
}

async function onCallButtonClick() {
    const { dialogs } = await api.get('/chats/my')
    const iAlreadyChatWithThem = dialogs.some((d) => d.otherUser.id === author.id)

    if (iAlreadyChatWithThem) {
        await goToDialogWithThem()
        return
    }

    const message = await showContactUserModal()

    if (message === undefined) {
        return
    }

    await api.post('/chats/create', {
        itemId: item.id,
        message
    })

    await goToDialogWithThem()
}
</script>

<style scoped>
.gallery {
    width: 100%;
    overflow: hidden;
}

.gallery, .slide {
    position: relative
}

.slide::before {
    content: '';
    display: block;
    padding-bottom: 84.39%
}

.slide img {
    left: 0;
    object-fit: contain;
    object-position: center;
    top: 0;
    width: 100%;
    height: 100%;
    position: absolute
}

.detail-grid {
    grid-gap: 0 50px;
    margin-bottom: 50px
}

:deep(.swiper-button-next) {
    transform: scale(-1, 1);
}

:deep(.swiper-button-next), :deep(.swiper-button-prev) {
    background: url("data:image/svg+xml,%3Csvg width='5' height='8' viewBox='0 0 5 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 7L1 4L4 1' stroke='black' stroke-linecap='square'/%3E%3C/svg%3E%0A") no-repeat center white;
    width: 30px;
    filter: drop-shadow(0 4px 6px rgba(72, 72, 72, .25));
    height: 30px;
    border-radius: 50%;
    z-index: 10;
    margin-top: -15px;
    display: block
}

:deep(.swiper-button-next)::after,
:deep(.swiper-button-next)::before,
:deep(.swiper-button-prev)::after,
:deep(.swiper-button-prev)::before {
    display: none
}

.info-head {
    display: flex;
    flex-direction: row;
    padding: 25px 0 22px;
    letter-spacing: -.03em;
    font-size: 14px;
    margin-bottom: 30px;
    color: #8c8ca3;
    border-bottom: 1px solid rgba(197, 197, 209, .5)
}

.info-author {
    margin-right: auto
}

.info-title {
    font-weight: 600;
    font-size: 24px;
    line-height: 32px;
    margin-bottom: 14px
}

.info-price {
    color: #fb0f47;
    font-weight: 600;
    font-size: 32px;
    line-height: 32px;
    margin-bottom: 40px
}

.call-wrap {
    margin-bottom: 23px
}

.parameter-row {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap
}

.parameter {
    padding-right: 25px;
    margin: 15px 0
}

.parameter-head {
    color: #8c8ca3;
    letter-spacing: -.03em;
    margin-bottom: 10px;
    font-size: 12px
}

.parameter-body {
    font-weight: 600;
    font-size: 16px;
    line-height: 100%;
    letter-spacing: -.03em;
    color: #1a1a47
}

.call-button {
    min-width: 250px;
    text-align: center
}

h2, h3 {
    font-weight: 600;
}

@media (max-width:992px) {
    .detail-grid {
        grid-gap: 0
    }

    .info-title {
        font-size: 18px
    }
}

@media (max-width:600px) {
    .parameter-body {
        font-size: 14px
    }

    .call-button {
        min-width: 100%
    }
}

.description {
    font-size: 16px;
    line-height: 175%;
    margin-bottom: 50px;
    margin-top: 10px;
}

.description p {
    line-height: 157%;
}
</style>
