import type { GenericResponse } from '../../../../generic-response.js'

export type ConfirmationEmailGetCodeResponse = GenericResponse<'Ok' | 'CannotSendMail'>
