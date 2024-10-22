import EventEmitter from 'eventemitter3'
import type { Ref } from 'vue'
import { shallowRef, watch } from 'vue'
import type { z } from 'zod'

export type FieldValidation<T = unknown> = ReturnType<typeof useFieldValidation<T, z.ZodType<T>>>

export function useFieldValidation<T, Schema extends z.ZodType>(field: Ref<T>, schema: Schema) {
    const error = shallowRef<z.ZodError<z.infer<Schema>>>()

    const emitter = new EventEmitter<{ trigger(): void }>()
    const on = emitter.on.bind(emitter)
    const off = emitter.off.bind(emitter)
    const emit = emitter.emit.bind(emitter)

    function touch() {
        const result = schema.safeParse(field.value)

        if (result.success) {
            error.value = undefined
        }
        else {
            error.value = result.error
        }

        emit('trigger')
    }

    function isError() {
        return error.value !== undefined
    }

    watch(field, () => {
        const result = schema.safeParse(field.value)

        if (result.success) {
            error.value = undefined
        }

        emit('trigger')
    })

    return { error, touch, isError, on, off, emit }
}
