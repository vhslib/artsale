import type { AnyMaskedOptions } from 'imask'
import { createPipe, PIPE_TYPE } from 'imask'
import { tuple } from '../util/tuple.js'

export type Pipe = (value: string) => string

export function createPipes(options: AnyMaskedOptions) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const mask: Pipe = createPipe(options)

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const unmask: Pipe = createPipe(options, PIPE_TYPE.MASKED, PIPE_TYPE.UNMASKED)

    return tuple(mask, unmask)
}
