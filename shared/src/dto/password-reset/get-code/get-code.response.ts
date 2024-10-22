import type { GenericResponse } from '../../../generic-response.js'

export type PasswordResetGetCodeResponse = GenericResponse<'Ok' | 'InvalidEmail' | 'CannotSendMail'>
