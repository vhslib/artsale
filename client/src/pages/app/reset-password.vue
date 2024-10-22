<template>
  <TwoColumnLayout>
    <template #main>
      <h1>Сброс пароля</h1>

      <form @submit.prevent="submit">
        <BaseHeadlineContainer headline="Новый пароль" class="headline-container">
          <BaseInput v-model="password" type="password" :validation="passwordValidation" />
        </BaseHeadlineContainer>

        <BaseButton kind="red" class="button">
          Готово
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
import { passwordSchema } from 'artsale-shared'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFieldValidation } from '../../composables/field-validation.js'
import { useTitle } from '../../composables/title.js'
import { useApi } from '../../context.js'
import { showInfoModal } from '../../modals/info-modal.js'
import { getRouteParam } from '../../router/helpers.js'

useTitle('Сброс пароля')

const api = useApi()
const router = useRouter()
const route = useRoute()

const password = ref('')
const passwordValidation = useFieldValidation(password, passwordSchema)

async function submit() {
    passwordValidation.touch()

    if (passwordValidation.isError()) {
        return
    }

    const response = await api.post('/password-reset/send-code', {
        code: getRouteParam(route, 'code')!,
        password: password.value
    })

    if (response.code === 'InvalidCode') {
        await showInfoModal({ message: 'Ссылка недействительна' })
        return
    }

    await api.login({
        login: response.email,
        password: password.value
    })

    await router.push({ name: 'Profile.Info' })
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
