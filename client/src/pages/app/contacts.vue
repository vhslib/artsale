<template>
  <TwoColumnLayout>
    <template #main>
      <h1>Контакты</h1>

      <div class="block contact-block">
        <p>
          <b>Адрес:</b> 123308, Москва г, Тверская, дом № 3, корпус 1<br />
          <b>Телефон:</b> <a href="tel:81232456780">+7 (123) 245-67-80</a><br />
          <b>E-mail:</b> <a href="mailto:artsale@as.ru">artsale@as.ru</a>
        </p>
      </div>

      <div class="grid _gap-30">
        <div class="col-lg-4 col-md-6 block">
          <h4>Пресс-служба</h4>
          <p>
            Для запросов СМИ<br />
            и на участие в мероприятиях
          </p>
          <p>
            <a href="mailto:pr@wildberries.ru">pr@wildberries.ru</a>
          </p>
        </div>

        <div class="col-lg-4 col-md-6 block">
          <h4>Официальные запросы</h4>
          <p>Для отправки или получения деловой документации</p>
          <p>
            <a href="mailto:sales@wildberries.ru">sales@wildberries.ru</a>
          </p>
        </div>

        <div class="col-lg-4 col-md-6 block">
          <h4>Партнерам</h4>
          <p>Узнайте подробные условия для сотрудничества</p>
          <p>
            <a href="#">Подробнее</a>
          </p>
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
import TwoColumnLayout from '../../components/TwoColumnLayout.vue'
import { useTitle } from '../../composables/title.js'

useTitle('Контакты')
</script>

<style scoped>
.block {
    font-size: 16px;
    line-height: 175%;
    margin-bottom: 10px;
    margin-top: 10px;
}

.contact-block {
    margin-bottom: 40px
}

p {
    line-height: 157%;
    margin-bottom: 20px;
}

b, h1 {
    font-weight: 600;
}

a {
    color: #fb0f47;
}

a:hover, a[href ^= tel] {
    text-decoration: none;
}

h4 {
    font-weight: 600;
    font-size: 16px;
    margin: 0;
}
</style>
