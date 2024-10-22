<template>
  <h3>Изменить объявление</h3>

  <form @submit.prevent="submit">
    <div class="grid _gap-x-20">
      <BaseHeadlineContainer headline="Описание" class="headline-container col-md-6">
        <BaseTextarea v-model="description" :validation="descriptionValidation" />
      </BaseHeadlineContainer>

      <BaseHeadlineContainer headline="Цена (₽)" class="headline-container col-md-6">
        <BaseInputMasked
          v-model="priceRaw"
          :validation="priceValidation"
          :mask="currencyMaskOptions"
        />
      </BaseHeadlineContainer>
    </div>

    <BaseButton kind="red">
      Сохранить
    </BaseButton>
  </form>
</template>

<script lang="ts" setup>
import BaseButton from '../../../components/BaseButton.vue'
import BaseHeadlineContainer from '../../../components/BaseHeadlineContainer.vue'
import BaseInputMasked from '../../../components/BaseInputMasked.vue'
import BaseTextarea from '../../../components/BaseTextarea.vue'
import type { ItemsGetByIdOkResponse, ItemsUpdateRequest } from 'artsale-shared'
import { itemDescriptionSchema, positiveInt32Schema } from 'artsale-shared'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useFieldValidation } from '../../../composables/field-validation.js'
import { useValidationScope } from '../../../composables/validation-scope.js'
import { useApi, usePageData, useStore } from '../../../context.js'
import { currencyMaskOptions } from '../../../masks/currency.js'
import { omitUnchangedKeys } from '../../../util/omit-unchanged-keys.js'
import { stringToNumberStrict } from '../../../util/string-to-number-strict.js'
import { resolveItemRoute } from '../item.js'

const router = useRouter()
const api = useApi()
const store = useStore()
const { item } = usePageData<ItemsGetByIdOkResponse>()

const validations = useValidationScope()

const description = ref(item.description)
const descriptionValidation = useFieldValidation(description, itemDescriptionSchema)
validations.add(descriptionValidation)

const priceRaw = ref(item.price.toString())
const priceNumber = computed(() => stringToNumberStrict(priceRaw.value))
const priceValidation = useFieldValidation(priceNumber, positiveInt32Schema)
validations.add(priceValidation)

async function submit() {
    validations.touch()

    if (validations.isError()) {
        return
    }

    const body: Omit<ItemsUpdateRequest, 'id'> = {
        description: description.value,
        price: priceNumber.value
    }

    await api.post('/items/update', {
        id: item.id,
        ...omitUnchangedKeys(body, item)
    })

    const category = store.findCategoryById(item.categoryId)!
    await router.push(resolveItemRoute(category, item))
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
