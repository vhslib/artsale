<template>
  <TwoColumnLayout>
    <template #main>
      <h1>Войти</h1>

      <div class="register-block">
        <p>
          Новый пользователь?

          <RouterLink :to="{ name: 'Register' }" class="register-link">
            Зарегистрироваться
          </RouterLink>
        </p>
      </div>

      <form @submit.prevent="submit">
        <BaseHeadlineContainer v-if="byPhone" headline="Телефон" class="headline-container">
          <template #header>
            <span class="change-login-type" @click="byPhone = false">
              Вход по электронной почте
            </span>
          </template>

          <BaseInputMasked
            v-model="phone"
            :mask="phoneMaskOptions"
            placeholder="+7 926 123 45 67"
            :validation="phoneValidation"
          />
        </BaseHeadlineContainer>

        <BaseHeadlineContainer v-else headline="Электронная почта" class="headline-container">
          <template #header>
            <span class="change-login-type" @click="byPhone = true">
              Вход по телефону
            </span>
          </template>

          <BaseInput
            v-model="email"
            placeholder="user@example.com"
            :validation="emailValidation"
          />
        </BaseHeadlineContainer>

        <BaseHeadlineContainer headline="Пароль" class="headline-container">
          <template #header>
            <RouterLink class="forgot-password-link" :to="{ name: 'ForgotPassword' }">
              Забыли пароль?
            </RouterLink>
          </template>

          <BaseInput v-model="password" type="password" :validation="passwordValidation" />
        </BaseHeadlineContainer>

        <BaseButton kind="red" class="button">
          Войти
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
import BaseInputMasked from '../../components/BaseInputMasked.vue'
import TwoColumnLayout from '../../components/TwoColumnLayout.vue'
import { emailSchema, passwordSchema, phoneSchema } from 'artsale-shared'
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useFieldValidation } from '../../composables/field-validation.js'
import { useTitle } from '../../composables/title.js'
import { useValidationScope } from '../../composables/validation-scope.js'
import { useApi } from '../../context.js'
import { phoneMaskOptions, unmaskPhone } from '../../masks/phone.js'
import { showInfoModal } from '../../modals/info-modal.js'

const api = useApi()

useTitle('Вход')

const router = useRouter()

const validations = useValidationScope()

const phone = ref('')
const phoneUnmasked = computed(() => unmaskPhone(phone.value))
const phoneValidation = useFieldValidation(phoneUnmasked, phoneSchema)

const email = ref('')
const emailValidation = useFieldValidation(email, emailSchema)

const byPhone = ref(true)

watch(
    byPhone,
    () => {
        if (byPhone.value) {
            phone.value = ''
            validations.remove(emailValidation)
            validations.add(phoneValidation)
        }
        else {
            email.value = ''
            validations.remove(phoneValidation)
            validations.add(emailValidation)
        }

        validations.clear()
    },
    { immediate: true }
)

const password = ref('')
const passwordValidation = useFieldValidation(password, passwordSchema)
validations.add(passwordValidation)

async function submit() {
    validations.touch()

    if (validations.isError()) {
        return
    }

    const response = await api.login({
        login: (byPhone.value ? phoneUnmasked : email).value,
        password: password.value
    })

    if (response.code === 'WrongLoginOrPassword') {
        await showInfoModal({ message: 'Неправильный логин или пароль' })
        return
    }

    await router.push({ name: 'Profile.Info' })
}
</script>

<style scoped>
.register-block {
    margin-top: -25px;
    margin-bottom: 40px;
    font-size: 14px;
}

@media (max-width:900px) {
    .register-block {
        margin-top: -10px;
        margin-bottom: 20px;
    }
}

.register-link {
    color: #fb0f47;
}

form {
    max-width: 350px
}

@media (max-width: 768px) {
    form {
        max-width: 100%;
    }
}

.forgot-password-link {
    color: #8c8ca3;
    font-size: 12px
}

.headline-container {
    margin-bottom: 20px;
}

.button {
    margin-top: 10px;
}

.change-login-type {
    color: #fb0f47;
    text-decoration: underline;
    cursor: pointer;
    font-size: 12px;
}
</style>
