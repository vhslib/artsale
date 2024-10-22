import type { GenericResponse } from '../../../generic-response.js'

export interface PasswordResetSendCodeOkResponse extends GenericResponse<'Ok'> {
    email: string
}

export type PasswordResetSendCodeResponse = PasswordResetSendCodeOkResponse | GenericResponse<'InvalidCode'>
