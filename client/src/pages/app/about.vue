<template>
  <OneColumnLayout>
    <div class="about-banner">
      <img class="about-banner__img" src="/assets/img/about-banner.jpg" />

      <div class="about-banner__title">
        О КОМПАНИИ
      </div>

      <div class="about-banner__video-btn" @click="isVideoOpen = true">
        Смотреть видео
      </div>

      <VideoPopup :is-open="isVideoOpen" @close="isVideoOpen = false" />
    </div>

    <div class="about-i">
      <div class="about-i__title">
        Мы – маркетплейс, который помогает привить любовь к искусству
        и взглянуть на него другими глазами
      </div>

      <div class="about-i__row">
        <div class="about-i__item">
          <div class="about-i__item-title">
            4 тыс
          </div>
          <div class="about-i__item-desc">
            продавцов
          </div>
        </div>

        <div class="about-i__item">
          <div class="about-i__item-title">
            1 млн
          </div>
          <div class="about-i__item-desc">
            предметов искусства
          </div>
        </div>

        <div class="about-i__item">
          <div class="about-i__item-title">
            10 тыс
          </div>
          <div class="about-i__item-desc">
            заказов в день
          </div>
        </div>
      </div>
    </div>

    <div class="about-advs">
      <h2>
        НАШИ ПРЕИМУЩЕСТВА
      </h2>

      <div class="grid _gap-20">
        <div class="about-adv col-lg-3 col-md-6 _black">
          <div class="about-adv__title">
            Более 1000 категорий по разным направлениям
          </div>

          <img class="about-adv__img" src="/assets/img/about-adv-1.png" />
        </div>

        <div class="about-adv col-lg-3 col-md-6 _white">
          <div class="about-adv__title">
            Более 1000 категорий по разным направлениям
          </div>

          <img class="about-adv__img" src="/assets/img/about-adv-2.png" />
        </div>

        <div class="about-adv col-lg-3 col-md-6 _black">
          <div class="about-adv__title">
            Более 1000 категорий по разным направлениям
          </div>

          <img class="about-adv__img" src="/assets/img/about-adv-1.png" />
        </div>

        <div class="about-adv col-lg-3 col-md-6 _white">
          <div class="about-adv__title">
            Более 1000 категорий по разным направлениям
          </div>

          <img class="about-adv__img" src="/assets/img/about-adv-1.png" />
        </div>
      </div>
    </div>

    <div class="about-awards">
      <div class="about-awards__content">
        <h2>НАШИ НАГРАДЫ</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>

      <div class="about-awards__row grid _gap-30">
        <div class="col-lg-3 col-md-6 about-award">
          <p>Более 1000 категорий по разным направлениям</p>
        </div>

        <div class="col-lg-3 col-md-6 about-award">
          <p>Более 1000 категорий по разным направлениям</p>
        </div>

        <div class="col-lg-3 col-md-6 about-award">
          <p>Более 1000 категорий по разным направлениям</p>
        </div>

        <div class="col-lg-3 col-md-6 about-award">
          <p>Более 1000 категорий по разным направлениям</p>
        </div>
      </div>
    </div>

    <div class="about-info__row grid">
      <div class="col-lg-6">
        <img class="about-info__img" src="/assets/img/about-img.jpg" />
      </div>

      <div class="about-info__content col-lg-6">
        <h2>Lorem ipsum dolor sit amet</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
    </div>
  </OneColumnLayout>
</template>

<script lang="ts" setup>
import OneColumnLayout from '../../components/OneColumnLayout.vue'
import VideoPopup from '../../components/VideoPopup.vue'
import { ref } from 'vue'
import { useTitle } from '../../composables/title.js'

useTitle('О нас')

const isVideoOpen = ref(false)
</script>

<style scoped>
.about-adv {
    font-size: 18px;
    line-height: 133%;
    padding: 50px 30px 280px;
    position: relative
}

.about-adv._black {
    color: #fff;
    background: #171d22
}

.about-adv._white {
    color: #1a1a47;
    background: linear-gradient(180deg, #e5e7ed 0, #fff 100%);
    box-shadow: 0 4px 13px rgba(26, 26, 71, .2)
}

.about-adv__img {
    position: absolute;
    left: 0;
    bottom: 0;
    max-width: 100%
}

.about-awards__content {
    max-width: 911px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 60px;
    text-align: center;
}

.about-awards__row {
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto
}

.about-award {
    background: url("data:image/svg+xml,%3Csvg width='54' height='54' viewBox='0 0 54 54' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M27 35.5583L27.3629 34.9019C27.1371 34.7771 26.8629 34.7771 26.6371 34.9019L27 35.5583ZM18.9652 40L18.2249 39.8792C18.1787 40.1627 18.2984 40.4477 18.5332 40.6131C18.768 40.7785 19.0766 40.7953 19.328 40.6564L18.9652 40ZM20.5 30.5924L21.2402 30.7131C21.2785 30.4782 21.2031 30.239 21.0368 30.0686L20.5 30.5924ZM14 23.9305L13.8868 23.1891C13.6089 23.2315 13.3781 23.4258 13.2888 23.6924C13.1996 23.959 13.2669 24.2531 13.4632 24.4543L14 23.9305ZM22.9826 22.559L23.0958 23.3004C23.343 23.2626 23.5552 23.1041 23.6615 22.8777L22.9826 22.559ZM27 14L27.6789 13.6813C27.5554 13.4181 27.2908 13.25 27 13.25C26.7092 13.25 26.4446 13.4181 26.3211 13.6813L27 14ZM31.0174 22.559L30.3385 22.8777C30.4448 23.1041 30.657 23.2626 30.9042 23.3004L31.0174 22.559ZM40 23.9305L40.5368 24.4543C40.7331 24.2531 40.8004 23.959 40.7112 23.6924C40.6219 23.4258 40.3911 23.2315 40.1132 23.1891L40 23.9305ZM33.5 30.5924L32.9632 30.0686C32.7969 30.239 32.7215 30.4782 32.7598 30.7131L33.5 30.5924ZM35.0349 40L34.672 40.6564C34.9234 40.7953 35.232 40.7785 35.4668 40.6131C35.7016 40.4477 35.8213 40.1627 35.7751 39.8792L35.0349 40ZM26.6371 34.9019L18.6023 39.3436L19.328 40.6564L27.3629 36.2147L26.6371 34.9019ZM19.7054 40.1208L21.2402 30.7131L19.7598 30.4716L18.2249 39.8792L19.7054 40.1208ZM21.0368 30.0686L14.5368 23.4067L13.4632 24.4543L19.9632 31.1161L21.0368 30.0686ZM14.1132 24.6719L23.0958 23.3004L22.8694 21.8176L13.8868 23.1891L14.1132 24.6719ZM23.6615 22.8777L27.6789 14.3187L26.3211 13.6813L22.3036 22.2403L23.6615 22.8777ZM26.3211 14.3187L30.3385 22.8777L31.6964 22.2403L27.6789 13.6813L26.3211 14.3187ZM30.9042 23.3004L39.8868 24.6719L40.1132 23.1891L31.1306 21.8176L30.9042 23.3004ZM39.4632 23.4067L32.9632 30.0686L34.0368 31.1161L40.5368 24.4543L39.4632 23.4067ZM32.7598 30.7131L34.2946 40.1208L35.7751 39.8792L34.2402 30.4716L32.7598 30.7131ZM35.3977 39.3436L27.3629 34.9019L26.6371 36.2147L34.672 40.6564L35.3977 39.3436ZM27 52.25C13.0548 52.25 1.75 40.9452 1.75 27H0.25C0.25 41.7736 12.2264 53.75 27 53.75V52.25ZM52.25 27C52.25 40.9452 40.9452 52.25 27 52.25V53.75C41.7736 53.75 53.75 41.7736 53.75 27H52.25ZM27 1.75C40.9452 1.75 52.25 13.0548 52.25 27H53.75C53.75 12.2264 41.7736 0.25 27 0.25V1.75ZM27 0.25C12.2264 0.25 0.25 12.2264 0.25 27H1.75C1.75 13.0548 13.0548 1.75 27 1.75V0.25Z' fill='%23FB0F47'/%3E%3C/svg%3E%0A") no-repeat top center;
    padding-top: 82px;
    position: relative;
    text-align: center
}

.about-award p,
.about-i__title {
    max-width: 209px;
    margin-left: auto;
    margin-right: auto
}

.about-i__title {
    font-weight: 600;
    font-size: 24px;
    line-height: 133%;
    text-align: center;
    margin-bottom: 28px;
    max-width: 845px
}

.about-i__item-desc {
    font-weight: 500;
    font-size: 14px
}

.about-i__item-title {
    font-weight: 600;
    font-size: 48px;
    line-height: 92%;
    color: #fb0f47;
    margin-bottom: 4px
}

.about-i__row {
    display: flex;
    flex-direction: row;
    max-width: 720px;
    margin-left: auto;
    margin-right: auto;
    justify-content: space-between
}

.about-info__img {
    max-width: 100%;
    width: 100%
}

.about-info__content {
    padding-left: 108px
}

.about-banner {
    height: 460px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: -80px
}

.about-banner::after,
.about-banner__img {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0
}

.about-banner::after {
    content: '';
    z-index: 2;
    background: rgba(0, 0, 0, .6);
    display: block
}

.about-banner__img {
    -o-object-fit: cover;
    object-fit: cover;
    -o-object-position: center;
    object-position: center;
    z-index: 1
}

.about-banner__title {
    font-weight: 600;
    font-size: 32px;
    color: #fff;
    position: relative;
    z-index: 10
}

.about-banner__video-btn {
    background: #fb0f47;
    color: #fff;
    width: 86px;
    height: 86px;
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    z-index: 11;
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

.about-banner__video-btn:hover {
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

.about-info__row {
    align-items: center;
}

.about-advs h2 {
    text-align: center;
    margin-bottom: 50px
}

.about-banner, .about-i, .about-awards, .about-advs {
    margin-bottom: 100px;
}

.about-awards__content, .about-info__content {
    font-size: 16px;
    line-height: 175%;
    margin-bottom: 10px;
    margin-top: 10px;
}

.about-awards__content p, .about-info__content p {
    line-height: 157%;
    margin-bottom: 20px;
}

.about-awards__content h2, .about-info__content h2 {
    font-weight: 600;
}

@media (max-width:992px) {
    .about-banner, .about-i, .about-awards, .about-advs {
        margin-bottom: 50px;
    }
    .about-advs h2 {
        margin-bottom: 25px
    }
    .about-awards__content {
        margin-bottom: 40px
    }
    .about-i__title {
        font-size: 18px
    }
    .about-i__item-title {
        font-size: 36px
    }
    .about-info__content {
        padding-left: 0;
        padding-top: 10px
    }
    .about-banner {
        height: calc(100vw*.4138);
        min-height: 150px;
        margin-top: -40px
    }
    .about-banner__title {
        font-size: 14px;
        line-height: 17px
    }
}

@media (max-width:768px) {
    .about-i__item {
        text-align: center;
        width: 100%;
        margin-bottom: 30px
    }
    .about-i__row {
        flex-wrap: wrap
    }
    .about-banner__video-btn {
        font-size: 5px;
        width: 40px;
        height: 40px;
        line-height: 6px;
        right: 51px;
        bottom: 19px
    }
}
</style>
