import type { GenericResponse } from '../../../../generic-response.js'

export type ConfirmationEmailSendCodeResponse = GenericResponse<'Ok' | 'InvalidCode'>
