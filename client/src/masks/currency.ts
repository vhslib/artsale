import type { AnyMaskedOptions } from 'imask'
import { createPipes } from './util.js'

export const currencyMaskOptions: AnyMaskedOptions = {
    lazy: false,
    mask: 'num',
    blocks: {
        num: {
            mask: Number,
            thousandsSeparator: ' '
        }
    }
}

export const [maskCurrency, unmaskCurrency] = createPipes(currencyMaskOptions)
