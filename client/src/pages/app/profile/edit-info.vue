<template>
  <form @submit.prevent="submit">
    <div class="container">
      <h3>Мои данные</h3>

      <div class="grid _gap-x-20">
        <BaseHeadlineContainer headline="Имя" class="headline-container col-md-6">
          <BaseInput v-model="firstName" :validation="firstNameValidation" />
        </BaseHeadlineContainer>

        <BaseHeadlineContainer headline="Фамилия" class="headline-container col-md-6">
          <BaseInput v-model="lastName" :validation="lastNameValidation" />
        </BaseHeadlineContainer>

        <BaseHeadlineContainer headline="Электронная почта" class="headline-container col-md-6">
          <BaseInput v-model="email" :validation="emailValidation" />
        </BaseHeadlineContainer>

        <BaseHeadlineContainer headline="Телефон" class="headline-container col-md-6">
          <BaseInputMasked
            v-model="phone"
            :mask="phoneMaskOptions"
            placeholder="+7 926 123 45 67"
            :validation="phoneValidation"
          />
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
import BaseInputMasked from '../../../components/BaseInputMasked.vue'
import type { ProfileUpdateRequest } from 'artsale-shared'
import { emailSchema, firstNameSchema, lastNameSchema, phoneSchema } from 'artsale-shared'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useFieldValidation } from '../../../composables/field-validation.js'
import { useTitle } from '../../../composables/title.js'
import { useValidationScope } from '../../../composables/validation-scope.js'
import { useApi, useStore } from '../../../context.js'
import { phoneMaskOptions, unmaskPhone } from '../../../masks/phone.js'
import { showInfoModal } from '../../../modals/info-modal.js'
import { omitUnchangedKeys } from '../../../util/omit-unchanged-keys.js'

useTitle('Редактировать профиль')

const router = useRouter()
const store = useStore()
const api = useApi()

const validations = useValidationScope()

const firstName = ref(store.profileData!.firstName)
const firstNameValidation = useFieldValidation(firstName, firstNameSchema)
validations.add(firstNameValidation)

const lastName = ref(store.profileData!.lastName)
const lastNameValidation = useFieldValidation(lastName, lastNameSchema)
validations.add(lastNameValidation)

const email = ref(store.profileData!.email)
const emailValidation = useFieldValidation(email, emailSchema)
validations.add(emailValidation)

const phone = ref(store.profileData!.phone)
const phoneUnmasked = computed(() => unmaskPhone(phone.value))
const phoneValidation = useFieldValidation(phoneUnmasked, phoneSchema)
validations.add(phoneValidation)

async function submit() {
    validations.touch()

    if (validations.isError()) {
        return
    }

    const body: ProfileUpdateRequest = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        phone: phoneUnmasked.value
    }

    const response = await api.post('/profile/update', omitUnchangedKeys(body, store.profileData!))

    if (response.code === 'LoginTaken') {
        await showInfoModal({ message: 'Пользователь с такой почтой и/или телефоном уже существует' })
        return
    }

    await router.push({ name: 'Profile.Info' })
}
</script>

<style scoped>
.container {
    margin-bottom: 10px
}

h3 {
    margin-bottom: 30px;
}

.headline-container {
    margin-bottom: 20px;
}
</style>
