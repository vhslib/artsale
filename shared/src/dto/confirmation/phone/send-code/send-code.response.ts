import type { GenericResponse } from '../../../../generic-response.js'

export type ConfirmationPhoneSendCodeResponse = GenericResponse<'Ok' | 'InvalidCode'>
