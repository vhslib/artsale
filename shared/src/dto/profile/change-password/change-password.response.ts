import type { GenericResponse } from '../../../generic-response.js'

export type ProfileChangePasswordResponse = GenericResponse<'Ok' | 'WrongPassword'>
