import type { MyProfileData } from '../../../entities/my-profile-data.js'
import type { GenericResponse } from '../../../generic-response.js'

export interface ProfileMyResponse extends GenericResponse<'Ok'> {
    profileData: MyProfileData
}
