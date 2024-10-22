import { adminAddOptionRoute } from './routes/admin/add-option.js'
import { adminAddPropertyRoute } from './routes/admin/add-property.js'
import { categoriesRoute } from './routes/categories.js'
import { chatsCreateRoute } from './routes/chats/create.js'
import { chatsGetByUserRoute } from './routes/chats/get-by-user.js'
import { chatsMyRoute } from './routes/chats/my.js'
import { chatsSendMessageRoute } from './routes/chats/send-message.js'
import { confirmationEmailGetCodeRoute } from './routes/confirmation/email/get-code.js'
import { confirmationEmailSendCodeRoute } from './routes/confirmation/email/send-code.js'
import { confirmationPhoneGetCodeRoute } from './routes/confirmation/phone/get-code.js'
import { confirmationPhoneSendCodeRoute } from './routes/confirmation/phone/send-code.js'
import { itemsActivateRoute } from './routes/items/activate.js'
import { itemsCreateRoute } from './routes/items/create.js'
import { itemsDeactivateRoute } from './routes/items/deactivate.js'
import { itemsDeleteRoute } from './routes/items/delete.js'
import { itemsGetByAuthorRoute } from './routes/items/get-by-author.js'
import { itemsGetByIdRoute } from './routes/items/get-by-id.js'
import { itemsMyRoute } from './routes/items/my.js'
import { itemsSearchRoute } from './routes/items/search.js'
import { itemsUpdateRoute } from './routes/items/update.js'
import { loginRoute } from './routes/login.js'
import { passwordResetGetCodeRoute } from './routes/password-reset/get-code.js'
import { passwordResetSendCodeRoute } from './routes/password-reset/send-code.js'
import { profileChangePasswordRoute } from './routes/profile/change-password.js'
import { profileCreateRoute } from './routes/profile/create.js'
import { profileMyRoute } from './routes/profile/my.js'
import { profileUpdateRoute } from './routes/profile/update.js'

export const routes = [
    loginRoute,

    confirmationEmailGetCodeRoute,
    confirmationEmailSendCodeRoute,
    confirmationPhoneGetCodeRoute,
    confirmationPhoneSendCodeRoute,

    passwordResetGetCodeRoute,
    passwordResetSendCodeRoute,

    profileUpdateRoute,
    profileMyRoute,
    profileChangePasswordRoute,
    profileCreateRoute,

    itemsCreateRoute,
    itemsMyRoute,
    itemsDeactivateRoute,
    itemsActivateRoute,
    itemsDeleteRoute,
    itemsSearchRoute,
    itemsGetByIdRoute,
    itemsGetByAuthorRoute,
    itemsUpdateRoute,

    categoriesRoute,

    chatsMyRoute,
    chatsCreateRoute,
    chatsGetByUserRoute,
    chatsSendMessageRoute,

    adminAddOptionRoute,
    adminAddPropertyRoute
]
