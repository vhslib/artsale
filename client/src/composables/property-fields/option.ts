import type { CategoryProperty } from 'artsale-shared'
import { ref } from 'vue'

export type PropertyFieldOption = ReturnType<typeof usePropertyFieldOption>

export function usePropertyFieldOption(property: CategoryProperty) {
    const value = ref<string>()

    function getValue() {
        return value.value
    }

    function resetValue() {
        value.value = undefined
    }

    return {
        type: 'OPTION' as const,
        property,
        value,
        getValue,
        resetValue
    }
}
