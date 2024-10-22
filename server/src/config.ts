import { z } from 'zod'

const schema = z.object({
    NODE_ENV: z.union([
        z.literal('development'),
        z.literal('production')
    ]),
    DATABASE_URL: z.string().min(1).url(),
    JWT_SECRET: z.string().min(7),
    IMAGE_STORAGE: z.string().min(1)
})

let config: z.infer<typeof schema>

export function loadConfig(raw: Record<string, string>) {
    config = schema.parse(raw)
}

export function getConfig() {
    return config
}
