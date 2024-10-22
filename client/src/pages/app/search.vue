<template>
  <TwoColumnLayout :sidebar-max-width="350">
    <template #main>
      <h1>
        {{ headerText }}

        <span class="items-count">
          {{ items.length }} {{ applyDeclension(items.length, declensions.item) }}
        </span>
      </h1>

      <p v-if="category" class="description">
        {{ category.description }}
      </p>

      <div v-if="items.length === 0" class="not-found">
        К сожалению, по вашему запросу ничего не найдено
      </div>

      <div v-else class="grid _gap-x-30">
        <Item
          v-for="item in items"
          :key="item.id"
          :item="item"
          class="col-md-4"
        />
      </div>
    </template>

    <template #sidebar>
      <h3>Параметры поиска</h3>

      <form @submit.prevent="onSubmit">
        <BaseHeadlineContainer headline="Цена" class="headline-container">
          <div class="price-container">
            <BaseInputMasked
              v-model="priceFromRaw"
              class="price-container-left"
              :mask="currencyMaskOptions"
              :validation="priceFromValidation"
              placeholder="От"
            />

            <BaseInputMasked
              v-model="priceToRaw"
              class="price-container-right"
              :mask="currencyMaskOptions"
              :validation="priceToValidation"
              placeholder="До"
            />
          </div>
        </BaseHeadlineContainer>

        <BaseHeadlineContainer
          v-for="field in propertyFields"
          :key="field.property.id"
          :headline="field.property.name"
          class="headline-container"
        >
          <BaseSelect
            v-model="field.value.value"
            :options="field.property.options"
            :placeholder="field.property.name"
          />
        </BaseHeadlineContainer>

        <div class="filters-buttons">
          <BaseButton type="button" kind="gray-border" class="filters-reset" @click="onReset">
            Сбросить
          </BaseButton>

          <BaseButton kind="red">
            Поиск
          </BaseButton>
        </div>
      </form>
    </template>
  </TwoColumnLayout>
</template>

<script lang="ts" setup>
import BaseButton from '../../components/BaseButton.vue'
import BaseHeadlineContainer from '../../components/BaseHeadlineContainer.vue'
import BaseInputMasked from '../../components/BaseInputMasked.vue'
import BaseSelect from '../../components/BaseSelect.vue'
import Item from '../../components/Item.vue'
import TwoColumnLayout from '../../components/TwoColumnLayout.vue'
import type { ItemsSearchResponse } from 'artsale-shared'
import { positiveInt32Schema } from 'artsale-shared'
import { computed, ref, shallowRef, watch } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import { useFieldValidation } from '../../composables/field-validation.js'
import { useMeta } from '../../composables/meta.js'
import { usePropertyFieldOption } from '../../composables/property-fields/option.js'
import { useSilentPush } from '../../composables/silent-push.js'
import { useTitle } from '../../composables/title.js'
import { useApi, usePageData, useStore } from '../../context.js'
import { currencyMaskOptions, unmaskCurrency } from '../../masks/currency.js'
import { getRouteParam, getRouteQuery } from '../../router/helpers.js'
import { parseProperties } from '../../services/search.js'
import { bind } from '../../util/bind.js'
import { capitalize } from '../../util/capitalize.js'
import { applyDeclension, declensions } from '../../util/declensions.js'
import { omitIfEmptyString } from '../../util/omit-if-empty-string.js'
import { createSlug } from '../../util/slug.js'
import { stringToNumberStrict } from '../../util/string-to-number-strict.js'
import { tuple } from '../../util/tuple.js'
import { resolveNotFoundRoute } from '../not-found.js'

interface PageData {
    response: ItemsSearchResponse
    properties?: Map<number, string>
}

const store = useStore()
const api = useApi()
const pageData = usePageData<PageData>()

const { silentPush, onBeforeRouteExternalUpdate, shallowRefUpdatedExternally } = useSilentPush()

const query = shallowRefUpdatedExternally((route) => getRouteQuery(route, 'query')?.trim() ?? '')

const category = shallowRef(bind(getRouteParam(useRoute(), 'category'), store.findCategoryBySlug))
onBeforeRouteUpdate((route) => {
    const categoryParam = getRouteParam(route, 'category')!
    const categorySlug = categoryParam === 'all' ? undefined : categoryParam
    const matchedCategory = bind(categorySlug, store.findCategoryBySlug)

    if (categorySlug !== undefined && !matchedCategory) {
        return resolveNotFoundRoute(route)
    }

    category.value = matchedCategory
})

watch(
    category,
    () => useMeta('description', category.value?.description.slice(0, 250)),
    { immediate: true }
)

function usePropertyFields() {
    function createPropertyFields() {
        if (!category.value) {
            return []
        }

        return category.value.properties.map((property) => {
            switch (property.type) {
                case 'OPTION': return usePropertyFieldOption(property)
                case 'MULTI_OPTION': return usePropertyFieldOption(property)
            }
        })
    }

    const propertyFields = shallowRef(createPropertyFields())

    watch(
        () => category.value?.id,
        () => propertyFields.value = createPropertyFields()
    )

    function setInitialValues(initialValues: Map<number, string>) {
        for (const field of propertyFields.value) {
            const initialValue = initialValues.get(field.property.id)

            if (initialValue === undefined) {
                field.resetValue()
                continue
            }

            field.value.value = String(initialValue)
        }
    }

    if (pageData.properties) {
        setInitialValues(pageData.properties)
    }

    onBeforeRouteExternalUpdate((route) => {
        if (!category.value) {
            return
        }

        const properties = parseProperties(route, category.value)

        if (!properties) {
            return resolveNotFoundRoute(route)
        }

        setInitialValues(properties)
    })

    function resetPropertyFields() {
        for (const field of propertyFields.value) {
            field.resetValue()
        }
    }

    function transformPropertyFieldsForPush() {
        const properties: string[] = []

        for (const field of propertyFields.value) {
            const value = bind(field.getValue(), String)

            if (value === undefined) {
                continue
            }

            properties.push(`${createSlug(field.property.name)}_${createSlug(value)}`)
        }

        return properties
    }

    function transformPropertyFieldsForApi() {
        if (propertyFields.value.length === 0) {
            return
        }

        const result: [number, string][] = []

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
        resetPropertyFields,
        transformPropertyFieldsForPush,
        transformPropertyFieldsForApi
    }
}

const {
    propertyFields,
    resetPropertyFields,
    transformPropertyFieldsForPush,
    transformPropertyFieldsForApi
} = usePropertyFields()

function useSearchTitle() {
    updateTitle()

    function updateTitle() {
        useTitle(buildTitle())
    }

    function buildTitle() {
        const fragments = getFragments()

        let result = ''

        if (query.value !== '') {
            result += `${query.value} - `
        }

        if (fragments !== '') {
            result += `${fragments}, `
        }

        result += 'объявления в Москве'

        return capitalize(result)
    }

    function getFragments() {
        if (!category.value) {
            return ''
        }

        const fragments = [
            category.value.name.toLowerCase()
        ]

        for (const field of propertyFields.value) {
            const value = field.getValue()

            if (value !== undefined) {
                fragments.push(value.toLowerCase())
            }
        }

        return fragments.join(', ')
    }

    return {
        updateTitle
    }
}

const { updateTitle } = useSearchTitle()

function useHeaderText() {
    const headerText = ref(buildHeaderText())

    function buildHeaderText() {
        if (!category.value) {
            if (query.value === '') {
                return 'Все объявления в Москве'
            }

            return `Объявления по запросу «${query.value}» в Москве`
        }

        if (query.value === '') {
            return `${category.value.name} в Москве`
        }

        return `${category.value.name} по запросу «${query.value}» в Москве`
    }

    function updateHeaderText() {
        headerText.value = buildHeaderText()
    }

    return {
        headerText,
        updateHeaderText
    }
}

const { headerText, updateHeaderText } = useHeaderText()

const priceFromRaw = shallowRefUpdatedExternally((route) => getRouteQuery(route, 'priceFrom') ?? '')
const priceFromNumber = computed(() => stringToNumberStrict(unmaskCurrency(priceFromRaw.value)))
const priceFromValidation = useFieldValidation(priceFromNumber, positiveInt32Schema.optional())

const priceToRaw = shallowRefUpdatedExternally((route) => getRouteQuery(route, 'priceTo') ?? '')
const priceToNumber = computed(() => stringToNumberStrict(unmaskCurrency(priceToRaw.value)))
const priceToValidation = useFieldValidation(priceToNumber, positiveInt32Schema.optional().refine((price) => {
    if (price === undefined || priceFromNumber.value === undefined) {
        return true
    }

    return price >= priceFromNumber.value
}))

priceFromValidation.on('trigger', priceToValidation.touch)

const items = shallowRef(pageData.response.items)

async function refetch() {
    const response = await api.post('/items/search', {
        query: query.value,
        categoryId: category.value?.id,
        properties: transformPropertyFieldsForApi(),
        priceFrom: priceFromNumber.value,
        priceTo: priceToNumber.value
    })

    items.value = response.items

    updateTitle()
    updateHeaderText()
}

onBeforeRouteExternalUpdate(refetch)

async function applyFilters() {
    await silentPush({
        params: {
            category: bind(category.value, (c) => createSlug(c.name)) ?? 'all',
            properties: transformPropertyFieldsForPush()
        },
        query: {
            query: omitIfEmptyString(query.value),
            priceFrom: priceFromNumber.value,
            priceTo: priceToNumber.value
        }
    })

    await refetch()
}

async function onSubmit() {
    priceFromValidation.touch()
    priceToValidation.touch()

    if (priceFromValidation.isError()) {
        return
    }

    if (priceToValidation.isError()) {
        return
    }

    await applyFilters()
}

async function onReset() {
    priceFromRaw.value = ''
    priceToRaw.value = ''
    resetPropertyFields()

    await applyFilters()
}
</script>

<style scoped>
.items-count {
    color: gray;
    display: inline-block;
    margin-left: 10px;
    font-size: 0.8em;
}

.description {
    font-size: 1.2em;
    margin-bottom: 30px;
    color: rgb(94, 94, 94);
}

.not-found {
    font-size: 18px;
}

.headline-container {
    margin-bottom: 25px;
}

.price-container {
    display: flex;
}

.price-container-left {
    border-right: none;
}

:deep(.error) + .price-container-right {
    border-left: none;
}

.filters-buttons {
    display: flex;
    flex-direction: row
}

.filters-reset {
    margin-right: 20px
}
</style>
