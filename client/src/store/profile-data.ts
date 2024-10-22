import type { MyProfileData } from 'artsale-shared'
import { ref } from 'vue'
import type { AppContext } from '../context.js'
import { isAuthError } from '../services/api.js'

export function useProfileDataStore(context: AppContext) {
    const profileData = ref<MyProfileData>()

    async function fetchProfileData() {
        try {
            const response = await context.api.get('/profile/my')
            profileData.value = response.profileData
        }
        catch (e) {
            if (isAuthError(e)) {
                profileData.value = undefined
                return
            }

            throw e
        }
    }

    function logout() {
        context.storage.remove('vhslibrary')
        profileData.value = undefined
    }

    return {
        profileData,
        fetchProfileData,
        logout
    }
}
