import type { z } from 'zod'

export type ZodDtoStatic<T> = {
    schema: z.ZodType<object>
    new(): T
}

interface CanStrict {
    strict(): z.ZodType<object>
}

export function createZodDto<T extends z.ZodType<object>>(schema: T & CanStrict): ZodDtoStatic<z.infer<T>> {
    return class {
        public static schema = schema.strict()
    }
}
