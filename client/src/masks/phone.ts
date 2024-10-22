import type { AnyMaskedOptions } from 'imask'
import { createPipes } from './util.js'

const masks = [
    '+{247} 0000',
    '+{290} 0000',
    '+{290} 0000',
    '+{683} 0000',
    '+{690} 0000',
    '+{500} 00000',
    '+{676} 00000',
    '+{677} 00000',
    '+{678} 00000',
    '+{688} 20000',
    '+{49} 000 000',
    '+{682} 00 000',
    '+{686} 00 000',
    '+{688} 900000',
    '+{95} 000 000',
    '+{298} 000 000',
    '+{376} 000 000',
    '+{387} 00 0000',
    '+{508} 00 0000',
    '+{597} 000 000',
    '+{672} 100 000',
    '+{672} 300 000',
    '+{681} 00 0000',
    '+{685} 00 0000',
    '+{687} 00 0000',
    '+{850} 000 000',
    '+{230} 000 0000',
    '+{239} 00 00000',
    '+{245} 0 000000',
    '+{246} 000 0000',
    '+{263} 0 000000',
    '+{269} 00 00000',
    '+{297} 000 0000',
    '+{299} 00 00 00',
    '+{354} 000 0000',
    '+{372} 000 0000',
    '+{387} 00 00000',
    '+{49} 000 00 00',
    '+{501} 000 0000',
    '+{507} 000 0000',
    '+{592} 000 0000',
    '+{597} 000 0000',
    '+{599} 000 0000',
    '+{599} 000 0000',
    '+{599} 000 0000',
    '+{60} 0 000 000',
    '+{62} 00 000 00',
    '+{65} 0000 0000',
    '+{670} 000 0000',
    '+{673} 000 0000',
    '+{674} 000 0000',
    '+{677} 000 0000',
    '+{678} 00 00000',
    '+{679} 00 00000',
    '+{680} 000 0000',
    '+{689} 00 00 00',
    '+{691} 000 0000',
    '+{692} 000 0000',
    '+{95} 0 000 000',
    '+{960} 000 0000',
    '+{220} 000 00 00',
    '+{232} 00 000000',
    '+{234} 00 000 00',
    '+{237} 0000 0000',
    '+{238} 000 00 00',
    '+{248} 0 000 000',
    '+{252} 0 000 000',
    '+{252} 0 000 000',
    '+{265} 1 000 000',
    '+{291} 0 000 000',
    '+{350} 000 00000',
    '+{356} 0000 0000',
    '+{372} 0000 0000',
    '+{373} 0000 0000',
    '+{47} 000 00 000',
    '+{49} 000 00 000',
    '+{504} 0000 0000',
    '+{505} 0000 0000',
    '+{506} 0000 0000',
    '+{52} 00 00 0000',
    '+{53} 0 000 0000',
    '+{599} 9000 0000',
    '+{60} 00 000 000',
    '+{62} 00 000 000',
    '+{64} 00 000 000',
    '+{66} 00 000 000',
    '+{670} 770 00000',
    '+{670} 780 00000',
    '+{850} 0000 0000',
    '+{852} 0000 0000',
    '+{853} 0000 0000',
    '+{886} 0000 0000',
    '+{95} 00 000 000',
    '+{961} 0 000 000',
    '+{965} 0000 0000',
    '+{967} 0 000 000',
    '+{973} 0000 0000',
    '+{974} 0000 0000',
    '+{975} 0 000 000',
    '+{1} 000 000 0000',
    '+{1} 242 000 0000',
    '+{1} 246 000 0000',
    '+{1} 264 000 0000',
    '+{1} 268 000 0000',
    '+{1} 284 000 0000',
    '+{1} 340 000 0000',
    '+{1} 345 000 0000',
    '+{1} 441 000 0000',
    '+{1} 473 000 0000',
    '+{1} 649 000 0000',
    '+{1} 664 000 0000',
    '+{1} 670 000 0000',
    '+{1} 671 000 0000',
    '+{1} 684 000 0000',
    '+{1} 721 000 0000',
    '+{1} 758 000 0000',
    '+{1} 767 000 0000',
    '+{1} 784 000 0000',
    '+{1} 809 000 0000',
    '+{1} 829 000 0000',
    '+{1} 849 000 0000',
    '+{1} 868 000 0000',
    '+{1} 869 000 0000',
    '+{1} 876 000 0000',
    '+{216} 00 000 000',
    '+{218} 00 000 000',
    '+{222} 00 00 0000',
    '+{223} 00 00 0000',
    '+{224} 00 000 000',
    '+{225} 00 000 000',
    '+{226} 00 00 0000',
    '+{227} 00 00 0000',
    '+{228} 00 000 000',
    '+{229} 00 00 0000',
    '+{231} 00 000 000',
    '+{234} 00 000 000',
    '+{236} 00 00 0000',
    '+{241} 0 00 00 00',
    '+{252} 00 000 000',
    '+{254} 000 000000',
    '+{257} 00 00 0000',
    '+{258} 00 000 000',
    '+{262} 00000 0000',
    '+{262} 00000 0000',
    '+{266} 0 000 0000',
    '+{267} 00 000 000',
    '+{268} 00 00 0000',
    '+{27} 00 000 0000',
    '+{31} 00 000 0000',
    '+{32} 000 000 000',
    '+{33} 000 000 000',
    '+{34} 000 000 000',
    '+{357} 00 000 000',
    '+{36} 000 000 000',
    '+{370} 000 00 000',
    '+{371} 00 000 000',
    '+{374} 00 000 000',
    '+{377} 00 000 000',
    '+{382} 00 000 000',
    '+{385} 00 000 000',
    '+{386} 00 000 000',
    '+{389} 00 000 000',
    '+{39} 6 698 00000',
    '+{40} 00 000 0000',
    '+{41} 00 000 0000',
    '+{45} 00 00 00 00',
    '+{46} 00 000 0000',
    '+{48} 000 000 000',
    '+{49} 000 00 0000',
    '+{502} 0 000 0000',
    '+{503} 00 00 0000',
    '+{509} 00 00 0000',
    '+{51} 000 000 000',
    '+{56} 0 0000 0000',
    '+{591} 0 000 0000',
    '+{593} 0 000 0000',
    '+{594} 00000 0000',
    '+{60} 00 000 0000',
    '+{60} 000 000 000',
    '+{61} 0 0000 0000',
    '+{62} 00 000 0000',
    '+{62} 800 000 000',
    '+{64} 000 000 000',
    '+{66} 00 000 0000',
    '+{675} 000 00 000',
    '+{81} 000 000 000',
    '+{82} 00 000 0000',
    '+{84} 00 0000 000',
    '+{850} 00 000 000',
    '+{855} 00 000 000',
    '+{856} 00 000 000',
    '+{880} 00 000 000',
    '+{93} 00 000 0000',
    '+{94} 00 000 0000',
    '+{961} 00 000 000',
    '+{966} 0 000 0000',
    '+{967} 00 000 000',
    '+{968} 00 000 000',
    '+{971} 0 000 0000',
    '+{972} 0 000 0000',
    '+{975} 17 000 000',
    '+{976} 00 00 0000',
    '+{977} 00 000 000',
    '+{993} 0 000 0000',
    '+{20} 000 000 0000',
    '+{211} 00 000 0000',
    '+{212} 00 0000 000',
    '+{213} 00 000 0000',
    '+{218} 21 000 0000',
    '+{221} 00 000 0000',
    '+{233} 000 000 000',
    '+{235} 00 00 00 00',
    '+{240} 00 000 0000',
    '+{242} 00 000 0000',
    '+{243} 000 000 000',
    '+{244} 000 000 000',
    '+{249} 00 000 0000',
    '+{250} 000 000 000',
    '+{251} 00 000 0000',
    '+{253} 00 00 00 00',
    '+{255} 00 000 0000',
    '+{256} 000 000 000',
    '+{260} 00 000 0000',
    '+{261} 00 00 00000',
    '+{264} 00 000 0000',
    '+{265} 0 0000 0000',
    '+{30} 000 000 0000',
    '+{351} 00 000 0000',
    '+{352} 000 000 000',
    '+{353} 000 000 000',
    '+{355} 000 000 000',
    '+{359} 000 000 000',
    '+{377} 000 000 000',
    '+{378} 0000 000000',
    '+{381} 00 000 0000',
    '+{39} 000 0000 000',
    '+{420} 000 000 000',
    '+{421} 000 000 000',
    '+{43} 000 000 0000',
    '+{44} 00 0000 0000',
    '+{49} 000 000 0000',
    '+{52} 000 000 0000',
    '+{54} 000 000 0000',
    '+{55} 00 0000 0000',
    '+{55} 00 7000 0000',
    '+{57} 000 000 0000',
    '+{58} 000 000 0000',
    '+{590} 000 000 000',
    '+{593} 00 000 0000',
    '+{595} 000 000 000',
    '+{598} 0 000 00 00',
    '+{62} 800 000 0000',
    '+{63} 000 000 0000',
    '+{64} 000 000 0000',
    '+{7} 000 000 00 00',
    '+{7} 600 000 00 00',
    '+{7} 700 000 00 00',
    '+{81} 00 0000 0000',
    '+{84} 000 0000 000',
    '+{86} 000 0000 000',
    '+{886} 0 0000 0000',
    '+{90} 000 000 0000',
    '+{91} 0000 000 000',
    '+{92} 000 000 0000',
    '+{962} 0 0000 0000',
    '+{963} 00 0000 000',
    '+{966} 5 0000 0000',
    '+{967} 000 000 000',
    '+{970} 00 000 0000',
    '+{971} 50 000 0000',
    '+{972} 50 000 0000',
    '+{98} 000 000 0000',
    '+{992} 00 000 0000',
    '+{995} 000 000 000',
    '+{996} 000 000 000',
    '+{998} 00 000 0000',
    '+{234} 000 000 0000',
    '+{234} 000 000 0000',
    '+{375} 00 000 00 00',
    '+{380} 00 000 00 00',
    '+{423} 000 000 0000',
    '+{49} 0000 000 0000',
    '+{55} 00 90000 0000',
    '+{596} 000 00 00 00',
    '+{850} 000 0000 000',
    '+{850} 191 000 0000',
    '+{856} 2000 000 000',
    '+{86} 000 0000 0000',
    '+{964} 000 000 0000',
    '+{994} 00 000 00 00',
    '+{358} 000 000 00 00',
    '+{62} 800 000 00 000',
    '+{86} 00 00000 00000',
    '+{850} 0000 0000000000000'
]

const defaultMask = {
    mask: '+000000000000000',
    startsWith: ''
}

export const phoneMaskOptions: AnyMaskedOptions = {
    mask: [
        ...masks.map((mask) => {
            const openingBraceIndex = mask.indexOf('{')
            const closingBraceIndex = mask.indexOf('}')
            const code = mask.substring(openingBraceIndex + 1, closingBraceIndex)

            return {
                mask,
                startsWith: code,
                lazy: false
            }
        }),
        defaultMask
    ],
    dispatch(appended, dynamicMasked) {
        const number = (dynamicMasked.value + appended).slice(1)

        type ExtendedMask = (typeof dynamicMasked.compiledMasks[0] & { startsWith: string })

        const masks = dynamicMasked.compiledMasks as ExtendedMask[]
        return masks.find((m) => number.startsWith(m.startsWith))!
    }
}

export const [maskPhone] = createPipes(phoneMaskOptions)

export function unmaskPhone(maskedPhone: string) {
    return maskedPhone.replaceAll(/[ -]/g, '')
}
