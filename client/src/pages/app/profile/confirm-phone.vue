<template>
  <div class="lk-block">
    <div class="h3-headline-row">
      <h3>Подтверждение телефона</h3>
    </div>

    <p>
      На ваш телефон
      {{ maskPhone(store.profileData!.phone) }}
      отправлено сообщение со ссылкой для подтверждения.
    </p>
  </div>
</template>

<script lang="ts" setup>
import { useTitle } from '../../../composables/title.js'
import { useStore } from '../../../context.js'
import { maskPhone } from '../../../masks/phone.js'

useTitle('Подтверждение телефона')
const store = useStore()
</script>
