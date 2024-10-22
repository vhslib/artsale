<template>
  <h3>Новое объявление</h3>

  <form @submit.prevent="submit">
    <div class="grid _gap-x-20">
      <BaseHeadlineContainer headline="Название" class="headline-container col-md-12">
        <BaseInput v-model="name" :validation="nameValidation" />
      </BaseHeadlineContainer>

      <BaseHeadlineContainer headline="Описание" class="headline-container col-md-12">
        <BaseTextarea v-model="description" :validation="descriptionValidation" />
      </BaseHeadlineContainer>

      <BaseHeadlineContainer headline="Цена (₽)" class="headline-container col-md-6">
        <BaseInputMasked
          v-model="priceRaw"
          :validation="priceValidation"
          :mask="currencyMaskOptions"
        />
      </BaseHeadlineContainer>

      <BaseHeadlineContainer headline="Категория" class="headline-container col-md-6">
        <BaseSelect
          v-model="categoryId"
          :options="store.categories.map((c) => ({ id: c.id.toString(), text: c.name }))"
          placeholder="Выберите категорию"
          :validation="categoryValidation"
        />
      </BaseHeadlineContainer>

      <BaseHeadlineContainer
        v-for="field in propertyFields"
        :key="field.property.id"
        :headline="field.property.name"
        class="headline-container col-md-6"
      >
        <!-- type === OPTION -->
        <BaseSelect
          v-if="field.type === 'OPTION'"
          v-model="field.value.value"
          :options="field.property.options"
          :placeholder="field.property.name"
        />

        <!-- type === MULTI_OPTION -->
        <BaseSelectMultiple
          v-if="field.type === 'MULTI_OPTION'"
          v-model="field.value.value"
          :options="field.property.options"
          :placeholder="field.property.name"
        />
      </BaseHeadlineContainer>
    </div>

    <div class="grid _gap-x-20">
      <BaseHeadlineContainer headline="Изображения" class="headline-container col-md-6">
        <ImageUploadButton
          v-model="images"
          :validation="imagesValidation"
          text="Добавьте от одного до десяти изображений"
          class="image-upload-button"
        />
      </BaseHeadlineContainer>

      <div v-show="images.length !== 0" class="col-md-12 image-gallery-container">
        <ImageUploadGallery
          v-model="images"
          @update:model-value="imagesValidation.touch()"
        />
      </div>
    </div>

    <div
      v-show="imagesValidation.isError()"
      class="images-error-message"
    >
      Необходимо загрузить хотя бы одно изображение
    </div>

    <BaseCheckbox v-model="agreement" :validation="agreementValidation" class="agreement">
      Я прочитал и принимаю условия обработки персональных данных
    </BaseCheckbox>

    <BaseButton kind="red-border">
      Опубликовать объявление
    </BaseButton>
  </form>
</template>

<script lang="ts" setup>
import BaseButton from '../../../components/BaseButton.vue'
import BaseCheckbox from '../../../components/BaseCheckbox.vue'
import BaseHeadlineContainer from '../../../components/BaseHeadlineContainer.vue'
import BaseInput from '../../../components/BaseInput.vue'
import BaseInputMasked from '../../../components/BaseInputMasked.vue'
import BaseSelect from '../../../components/BaseSelect.vue'
import BaseSelectMultiple from '../../../components/BaseSelectMultiple.vue'
import BaseTextarea from '../../../components/BaseTextarea.vue'
import ImageUploadButton from '../../../components/ImageUploadButton.vue'
import ImageUploadGallery from '../../../components/ImageUploadGallery.vue'
import { itemDescriptionSchema, itemNameSchema, notUndefinedSchema, positiveInt32Schema } from 'artsale-shared'
import { computed, ref, shallowRef, watch } from 'vue'
import { useRouter } from 'vue-router'
import { z } from 'zod'
import { useFieldValidation } from '../../../composables/field-validation.js'
import { usePropertyFieldMultiOption } from '../../../composables/property-fields/multi-option.js'
import { usePropertyFieldOption } from '../../../composables/property-fields/option.js'
import { useTitle } from '../../../composables/title.js'
import { useValidationScope } from '../../../composables/validation-scope.js'
import { useApi, useStore } from '../../../context.js'
import type { ImageEntry } from '../../../entities/image-entry.js'
import { currencyMaskOptions, unmaskCurrency } from '../../../masks/currency.js'
import { showInfoModal } from '../../../modals/info-modal.js'
import { bind } from '../../../util/bind.js'
import { normalizeBase64Image } from '../../../util/normalize-base64-image.js'
import { stringToNumber } from '../../../util/string-to-number.js'
import { stringToNumberStrict } from '../../../util/string-to-number-strict.js'
import { tuple } from '../../../util/tuple.js'

useTitle('Новое объявление')

const router = useRouter()
const store = useStore()
const api = useApi()

const validations = useValidationScope()

const name = ref('')
const nameValidation = useFieldValidation(name, itemNameSchema)
validations.add(nameValidation)

const description = ref('')
const descriptionValidation = useFieldValidation(description, itemDescriptionSchema)
validations.add(descriptionValidation)

const priceRaw = ref('')
const priceNumber = computed(() => stringToNumberStrict(unmaskCurrency(priceRaw.value)))
const priceValidation = useFieldValidation(priceNumber, positiveInt32Schema)
validations.add(priceValidation)

const images = ref<ImageEntry[]>([])
const imagesValidation = useFieldValidation(images, z.array(z.unknown()).min(1))
validations.add(imagesValidation)

const categoryId = ref<string>()
const category = computed(() => bind(stringToNumber(categoryId.value), store.findCategoryById))
const categoryValidation = useFieldValidation(category, notUndefinedSchema)
validations.add(categoryValidation)

function usePropertyFields() {
    function createPropertyFields() {
        if (!category.value) {
            return []
        }

        return category.value.properties.map((property) => {
            switch (property.type) {
                case 'OPTION': return usePropertyFieldOption(property)
                case 'MULTI_OPTION': return usePropertyFieldMultiOption(property)
            }
        })
    }

    const propertyFields = shallowRef(createPropertyFields())

    watch(
        () => category.value?.id,
        () => propertyFields.value = createPropertyFields()
    )

    function transformProperties() {
        const result: [number, string | string[]][] = []

        for (const field of propertyFields.value) {
            const value = field.getValue()

            if (value === undefined) {
                continue
            }

            result.push(tuple(field.property.id, value))
        }

        return result
    }

    return {
        propertyFields,
        transformProperties
    }
}

const { propertyFields, transformProperties } = usePropertyFields()

const agreement = ref(false)
const agreementValidation = useFieldValidation(agreement, z.literal(true))
validations.add(agreementValidation)

async function submit() {
    validations.touch()

    if (validations.isError()) {
        return
    }

    const response = await api.post('/items/create', {
        name: name.value,
        description: description.value,
        price: priceNumber.value!,
        imagesBase64: images.value.map(({ url }) => normalizeBase64Image(url)),
        categoryId: category.value!.id,
        properties: transformProperties()
    })

    if (response.code === 'InvalidImage') {
        await showInfoModal({ message: 'Ошибка при загрузке изображений' })
        return
    }

    await router.push({ name: 'Profile.Items' })
}
</script>

<style scoped>
h3 {
    margin-bottom: 30px;
}

.headline-container {
    margin-bottom: 20px;
}

.image-upload-button {
    margin-bottom: 10px;
}

.images-error-message, .image-gallery-container {
    margin-bottom: 40px;
}

.images-error-message::before {
    background: url("data:image/svg+xml,%3Csvg width='16' height='14' viewBox='0 0 16 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 1L1 13H15L8 1Z' stroke='%23FB0F47' stroke-linejoin='round'/%3E%3Cpath d='M7.431 5.5H8.615L8.415 9.244H7.623L7.431 5.5ZM8.023 11.156C7.83633 11.156 7.68167 11.0973 7.559 10.98C7.43633 10.8573 7.375 10.708 7.375 10.532C7.375 10.356 7.43633 10.2093 7.559 10.092C7.68167 9.97467 7.83633 9.916 8.023 9.916C8.20433 9.916 8.35367 9.97467 8.471 10.092C8.59367 10.2093 8.655 10.356 8.655 10.532C8.655 10.708 8.59367 10.8573 8.471 10.98C8.35367 11.0973 8.20433 11.156 8.023 11.156Z' fill='%23FB0F47'/%3E%3C/svg%3E%0A") no-repeat center;
    display: inline-block;
    content: '';
    width: 15px;
    height: 13px;
    margin-right: 10px
}

.agreement {
    margin-bottom: 35px;
}
</style>
