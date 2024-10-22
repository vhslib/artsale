import type { GenericResponse } from '../../generic-response.js'

export interface LoginOkResponse extends GenericResponse<'Ok'> {
    token: string
}

export type LoginResponse = LoginOkResponse | GenericResponse<'WrongLoginOrPassword'>
