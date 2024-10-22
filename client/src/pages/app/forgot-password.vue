<template>
  <TwoColumnLayout>
    <template #main>
      <h1>Восстановление пароля</h1>

      <form @submit.prevent="submit">
        <BaseHeadlineContainer headline="Электронная почта" class="headline-container">
          <BaseInput v-model="email" :validation="emailValidation" />
        </BaseHeadlineContainer>

        <BaseButton kind="red" class="button">
          Сбросить текущий пароль
        </BaseButton>
      </form>
    </template>

    <template #sidebar>
      <BannerBlock />
    </template>
  </TwoColumnLayout>
</template>

<script lang="ts" setup>
import BannerBlock from '../../components/BannerBlock.vue'
import BaseButton from '../../components/BaseButton.vue'
import BaseHeadlineContainer from '../../components/BaseHeadlineContainer.vue'
import BaseInput from '../../components/BaseInput.vue'
import TwoColumnLayout from '../../components/TwoColumnLayout.vue'
import { emailSchema } from 'artsale-shared'
import { ref } from 'vue'
import { useFieldValidation } from '../../composables/field-validation.js'
import { useTitle } from '../../composables/title.js'
import { useApi } from '../../context.js'
import { showInfoModal } from '../../modals/info-modal.js'

useTitle('Восстановление пароля')

const api = useApi()

const email = ref('')
const emailValidation = useFieldValidation(email, emailSchema)

async function submit() {
    emailValidation.touch()

    if (emailValidation.isError()) {
        return
    }

    const response = await api.post('/password-reset/get-code', {
        email: email.value
    })

    if (response.code === 'InvalidEmail') {
        await showInfoModal({ message: 'Пользователя с такой почтой не существует' })
        return
    }

    if (response.code === 'CannotSendMail') {
        await showInfoModal({ message: 'Не удалось отправить письмо' })
        return
    }

    await showInfoModal({
        title: 'Готово',
        message: 'Ссылка для сброса пароля отправлена на вашу почту'
    })
}
</script>

<style scoped>
form {
    max-width: 350px
}

.headline-container {
    margin-bottom: 20px;
}

.button {
    margin-top: 10px;
}

@media (max-width: 768px) {
    form {
        max-width: 100%
    }
}
</style>
