import type { FieldValidation } from './field-validation.js'

export function useValidationScope() {
    const validations: FieldValidation[] = []

    function add(validation: FieldValidation) {
        validations.push(validation)
    }

    function remove(validation: FieldValidation) {
        const index = validations.indexOf(validation)

        if (index === -1) {
            return
        }

        validations.splice(index, 1)
    }

    function touch() {
        for (const validation of validations) {
            validation.touch()
        }
    }

    function clear() {
        for (const validation of validations) {
            validation.error.value = undefined
        }
    }

    function isError() {
        for (const validation of validations) {
            if (validation.isError()) {
                return true
            }
        }

        return false
    }

    return {
        add,
        remove,
        touch,
        clear,
        isError
    }
}
