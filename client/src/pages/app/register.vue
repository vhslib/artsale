<template>
  <TwoColumnLayout>
    <template #main>
      <h1>Зарегистрироваться</h1>

      <div class="login-block">
        <p>
          У вас уже есть личный кабинет?

          <RouterLink :to="{ name: 'Login' }" class="login-link">
            Войти
          </RouterLink>
        </p>
      </div>

      <form @submit.prevent="submit">
        <div class="grid _gap-x-20 form-inner">
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

          <BaseHeadlineContainer headline="Пароль" class="headline-container col-md-6">
            <BaseInput v-model="password" type="password" :validation="passwordValidation" />
          </BaseHeadlineContainer>
        </div>

        <BaseCheckbox v-model="agreement" :validation="agreementValidation">
          Я прочитал и принимаю условия обработки персональных данных
        </BaseCheckbox>

        <BaseButton kind="red" class="button">
          Зарегистрироваться
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
import BaseCheckbox from '../../components/BaseCheckbox.vue'
import BaseHeadlineContainer from '../../components/BaseHeadlineContainer.vue'
import BaseInput from '../../components/BaseInput.vue'
import BaseInputMasked from '../../components/BaseInputMasked.vue'
import TwoColumnLayout from '../../components/TwoColumnLayout.vue'
import { emailSchema, firstNameSchema, lastNameSchema, passwordSchema, phoneSchema } from 'artsale-shared'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { z } from 'zod'
import { useFieldValidation } from '../../composables/field-validation.js'
import { useTitle } from '../../composables/title.js'
import { useValidationScope } from '../../composables/validation-scope.js'
import { useApi } from '../../context.js'
import { phoneMaskOptions, unmaskPhone } from '../../masks/phone.js'
import { showInfoModal } from '../../modals/info-modal.js'

useTitle('Регистрация')

const router = useRouter()
const api = useApi()

const validations = useValidationScope()

const firstName = ref('')
const firstNameValidation = useFieldValidation(firstName, firstNameSchema)
validations.add(firstNameValidation)

const lastName = ref('')
const lastNameValidation = useFieldValidation(lastName, lastNameSchema)
validations.add(lastNameValidation)

const email = ref('')
const emailValidation = useFieldValidation(email, emailSchema)
validations.add(emailValidation)

const phone = ref('')
const phoneUnmasked = computed(() => unmaskPhone(phone.value))
const phoneValidation = useFieldValidation(phoneUnmasked, phoneSchema)
validations.add(phoneValidation)

const password = ref('')
const passwordValidation = useFieldValidation(password, passwordSchema)
validations.add(passwordValidation)

const agreement = ref(false)
const agreementValidation = useFieldValidation(agreement, z.literal(true))
validations.add(agreementValidation)

async function submit() {
    validations.touch()

    if (validations.isError()) {
        return
    }

    const response = await api.post('/profile/create', {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        phone: phoneUnmasked.value,
        password: password.value
    })

    if (response.code === 'LoginTaken') {
        await showInfoModal({ message: 'Пользователь с такой почтой и/или телефоном уже существует' })
        return
    }

    await api.login({
        login: email.value,
        password: password.value
    })

    await router.push({ name: 'Profile.Info' })
}
</script>

<style scoped>
.login-block {
    margin-top: -25px;
    margin-bottom: 40px;
    font-size: 14px;
}

@media (max-width:900px) {
    .login-block {
        margin-top: -10px;
        margin-bottom: 20px;
    }
}

.login-link {
    color: #fb0f47;
}

form {
    max-width: 750px;
}

.form-inner {
    margin-bottom: 20px;
}

.headline-container {
    margin-bottom: 20px;
}

.button {
    margin-top: 30px;
}
</style>
