<template>
  <h3>Редактировать категории</h3>

  <div v-for="category in store.categories" :key="category.id" class="category">
    <div class="category-name">
      {{ category.name }}
    </div>

    <ul class="property-list">
      <li
        v-for="property in category.properties"
        :key="property.id"
        class="property"
        :class="{ expanded: expandedProperties.has(property.id) }"
      >
        <div class="property-name" @click="togglePropertyExpanded(property.id)">
          {{ property.name }}
        </div>

        <ul class="property-option-list">
          <li v-for="option in property.options" :key="option" class="property-option">
            {{ option }}
          </li>

          <div class="add-link" @click="addOption(property)">
            Добавить опцию...
          </div>
        </ul>
      </li>

      <div class="add-link" @click="addProperty(category)">
        Добавить свойство...
      </div>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import type { Category, CategoryProperty } from 'artsale-shared'
import { ref } from 'vue'
import { useApi, useStore } from '../../../context.js'
import { showAdminAddOptionModal } from '../../../modals/admin-add-option-modal.js'
import { showAdminAddPropertyModal } from '../../../modals/admin-add-property-modal.js'

const store = useStore()
const api = useApi()

const expandedProperties = ref(new Set<number>())

function togglePropertyExpanded(id: number) {
    if (expandedProperties.value.has(id)) {
        expandedProperties.value.delete(id)
    }
    else {
        expandedProperties.value.add(id)
    }
}

async function addOption(property: CategoryProperty) {
    const option = await showAdminAddOptionModal({ property })

    if (option === undefined) {
        return
    }

    await api.post('/admin/add-option', {
        propertyId: property.id,
        option
    })

    await store.fetchCategories()
}

async function addProperty(category: Category) {
    const result = await showAdminAddPropertyModal({ category })

    if (!result) {
        return
    }

    await api.post('/admin/add-property', {
        categoryId: category.id,
        name: result.name,
        type: result.type
    })

    await store.fetchCategories()
}
</script>

<style scoped>
h3 {
    margin-bottom: 30px;
}

.category {
    margin-bottom: 30px;
}

.category-name {
    font-weight: bold;
    font-size: 1.3em;
    margin-bottom: 15px;
}

.property {
    margin-bottom: 15px;
}

.property-list {
    list-style: disc;
    margin-left: 10px;
    font-size: 1.1em;
}

.property-name {
    cursor: pointer;
    margin-bottom: 15px;
}

.property-option-list {
    list-style: disc;
    margin-left: 20px;
    margin-bottom: 20px;
    display: none;
}

.property.expanded .property-option-list {
    display: block;
}

.property-option {
    margin-bottom: 10px;
}

.add-link {
    margin-bottom: 10px;
    cursor: pointer;
    color: #fb0f47;
}
</style>
