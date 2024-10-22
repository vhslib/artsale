import type { Category } from 'artsale-shared'
import { shallowRef } from 'vue'
import type { AppContext } from '../context.js'
import { createSlug } from '../util/slug.js'

export function useCategoriesStore(context: AppContext) {
    const categories = shallowRef<Category[]>([])

    async function fetchCategories() {
        const response = await context.api.get('/categories')
        categories.value = response.categories
    }

    function findCategoryById(id: number) {
        return categories.value.find((c) => c.id === id)
    }

    function findCategoryBySlug(slug: string) {
        return categories.value.find((c) => createSlug(c.name) === slug)
    }

    return {
        categories,
        fetchCategories,
        findCategoryById,
        findCategoryBySlug
    }
}
