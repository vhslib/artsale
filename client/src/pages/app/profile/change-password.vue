<template>
  <h3>Сменить пароль</h3>

  <form @submit.prevent="submit">
    <div class="grid _gap-x-20">
      <div class="col-md-6">
        <BaseHeadlineContainer class="headline-container" headline="Старый пароль">
          <BaseInput v-model="oldPassword" type="password" :validation="oldPasswordValidation" />
        </BaseHeadlineContainer>

        <BaseHeadlineContainer class="headline-container" headline="Новый пароль">
          <BaseInput v-model="newPassword" type="password" :validation="newPasswordValidation" />
        </BaseHeadlineContainer>
      </div>
    </div>

    <BaseButton kind="red">
      Сохранить
    </BaseButton>
  </form>
</template>

<script lang="ts" setup>
import BaseButton from '../../../components/BaseButton.vue'
import BaseHeadlineContainer from '../../../components/BaseHeadlineContainer.vue'
import BaseInput from '../../../components/BaseInput.vue'
import { passwordSchema } from 'artsale-shared'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useFieldValidation } from '../../../composables/field-validation.js'
import { useTitle } from '../../../composables/title.js'
import { useValidationScope } from '../../../composables/validation-scope.js'
import { useApi } from '../../../context.js'
import { showInfoModal } from '../../../modals/info-modal.js'

useTitle('Сменить пароль')

const router = useRouter()
const api = useApi()

const validations = useValidationScope()

const oldPassword = ref('')
const oldPasswordValidation = useFieldValidation(oldPassword, passwordSchema)
validations.add(oldPasswordValidation)

const newPassword = ref('')
const newPasswordValidation = useFieldValidation(newPassword, passwordSchema)
validations.add(newPasswordValidation)

async function submit() {
    validations.touch()

    if (validations.isError()) {
        return
    }

    const response = await api.post('/profile/change-password', {
        oldPassword: oldPassword.value,
        newPassword: newPassword.value
    })

    if (response.code === 'WrongPassword') {
        await showInfoModal({ message: 'Неправильный пароль' })
        return
    }

    await router.push({ name: 'Profile.Info' })
}
</script>

<style scoped>
h3 {
    margin-bottom: 30px;
}

.headline-container {
    margin-bottom: 20px;
}
</style>
