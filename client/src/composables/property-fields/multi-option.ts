import type { CategoryProperty } from 'artsale-shared'
import { ref } from 'vue'

export type PropertyFieldMultiOption = ReturnType<typeof usePropertyFieldMultiOption>

export function usePropertyFieldMultiOption(property: CategoryProperty) {
    const value = ref<string[]>([])

    function getValue() {
        return value.value
    }

    function resetValue() {
        value.value = []
    }

    return {
        type: 'MULTI_OPTION' as const,
        property,
        value,
        getValue,
        resetValue
    }
}
