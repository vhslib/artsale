import type { GenericResponse } from '../../../generic-response.js'

export type ProfileCreateResponse = GenericResponse<'Ok' | 'LoginTaken'>
