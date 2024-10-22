import { isValidPhoneNumber } from 'libphonenumber-js/mobile'
import isEmail from 'validator/lib/isEmail.js'
import { z } from 'zod'

export const positiveInt32Schema = z.number().positive().max(2147483647)
export const passwordSchema = z.string().min(6)
export const notUndefinedSchema = z.unknown().refine((value) => value !== undefined)

export const emailSchema = z.string().refine((email) => {
    return isEmail(email, {
        allow_utf8_local_part: false,
        domain_specific_validation: true
    })
})

export const phoneSchema = z.string().refine(isValidPhoneNumber)

function notSurroundedBySpaces(value: string) {
    return !value.startsWith(' ') && !value.endsWith(' ')
}

export const firstNameSchema = z.string().min(1).refine(notSurroundedBySpaces)
export const lastNameSchema = z.string().min(1).refine(notSurroundedBySpaces)
export const itemNameSchema = z.string().min(1).refine(notSurroundedBySpaces)
export const itemDescriptionSchema = z.string().min(1).refine(notSurroundedBySpaces)

export const propertyNameSchema = z.string().min(1).refine(notSurroundedBySpaces)

export const optionSchema = z.string().min(1).refine(notSurroundedBySpaces)

export function getOptionPropertySchema(options: string[]) {
    return z.enum(options as [string])
}

export function getMultiOptionPropertySchema(options: string[]) {
    return z.array(z.enum(options as [string]))
}

export const chatMessageSchema = z.string().min(1).refine(notSurroundedBySpaces)
