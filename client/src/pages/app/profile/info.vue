<template>
  <div class="container">
    <div class="header-container">
      <h3>Мои данные</h3>

      <RouterLink class="edit-link" :to="{ name: 'Profile.EditInfo' }">
        Редактировать
      </RouterLink>
    </div>

    <div class="grid _gap-x-20">
      <div class="info-entry col-md-6">
        <div class="info-entry-name">
          Имя
        </div>

        <div class="info-entry-value">
          {{ profileData.firstName }}
        </div>
      </div>

      <div class="info-entry col-md-6">
        <div class="info-entry-name">
          Фамилия
        </div>

        <div class="info-entry-value">
          {{ profileData.lastName }}
        </div>
      </div>

      <div class="info-entry col-md-6">
        <div class="info-entry-name">
          Электронная почта

          <RouterLink
            v-if="!profileData.emailConfirmed"
            class="edit-link"
            :to="{ name: 'Profile.ConfirmEmail' }"
          >
            Подтвердить
          </RouterLink>

          <span v-else class="confirmed-label">
            (подтверждена)
          </span>
        </div>

        <div class="info-entry-value">
          {{ profileData.email }}
        </div>
      </div>

      <div class="info-entry col-md-6">
        <div class="info-entry-name">
          Телефон

          <RouterLink
            v-if="!profileData.phoneConfirmed"
            class="edit-link"
            :to="{ name: 'Profile.ConfirmPhone' }"
          >
            Подтвердить
          </RouterLink>

          <span v-else class="confirmed-label">
            (подтвержден)
          </span>
        </div>

        <div class="info-entry-value">
          {{ phoneMasked }}
        </div>
      </div>

      <div class="info-entry col-md-6">
        <div class="info-entry-name">
          Пароль

          <RouterLink class="edit-link" :to="{ name: 'Profile.ChangePassword' }">
            Изменить
          </RouterLink>
        </div>

        <div class="info-entry-value">
          *************
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useTitle } from '../../../composables/title.js'
import { useStore } from '../../../context.js'
import { maskPhone } from '../../../masks/phone.js'

useTitle('Профиль')

const store = useStore()
const profileData = store.profileData!
const phoneMasked = computed(() => maskPhone(profileData.phone))
</script>

<style scoped>
.container {
    margin-bottom: 32px
}

.header-container {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    margin-bottom: 30px
}

h3 {
    margin-bottom: 0;
}

.edit-link {
    color: #fb0f47;
    font-weight: 500;
    font-size: 10px;
    text-decoration: underline;
    margin-left: 20px
}

.edit-link:hover {
    text-decoration: none;
}

.info-entry {
    margin-bottom: 36px
}

.info-entry-name {
    font-size: 12px;
    line-height: 133%;
    letter-spacing: -.03em;
    margin-bottom: 10px;
    color: #8c8ca3
}

.info-entry-value {
    font-weight: 500;
    font-size: 16px;
    line-height: 20px
}

.confirmed-label {
    color: rgb(0, 124, 0);
    font-style: italic;
}
</style>
