<template>
  <div class="lk-block">
    <div class="h3-headline-row">
      <h3>Подтверждение электронной почты</h3>
    </div>

    <p v-if="pageData.code === 'Ok'">
      На вашу почту {{ store.profileData!.email }} отправлено письмо
      со ссылкой для подтверждения.
    </p>

    <p v-else class="error">
      Не удалось отправить письмо на почту {{ store.profileData!.email }}.
      Пожалуйста, проверьте адрес.
    </p>
  </div>
</template>

<script lang="ts" setup>
import type { ConfirmationEmailGetCodeResponse } from 'artsale-shared'
import { useTitle } from '../../../composables/title.js'
import { usePageData, useStore } from '../../../context.js'

useTitle('Подтверждение электронной почты')
const store = useStore()
const pageData = usePageData<ConfirmationEmailGetCodeResponse>()
</script>

<style scoped>
.error {
    color: rgb(199, 0, 0);
}
</style>
