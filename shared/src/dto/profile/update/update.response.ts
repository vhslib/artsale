import type { GenericResponse } from '../../../generic-response.js'

export type ProfileUpdateResponse = GenericResponse<'Ok' | 'LoginTaken'>
