import type { AdminAddOptionRequest } from './dto/admin/add-option/add-option.request.js'
import type { AdminAddOptionResponse } from './dto/admin/add-option/add-option.response.js'
import type { AdminAddPropertyRequest } from './dto/admin/add-property/add-property.request.js'
import type { CategoriesResponse } from './dto/categories/categories.response.js'
import type { ChatsCreateRequest } from './dto/chats/create/create.request.js'
import type { ChatsCreateResponse } from './dto/chats/create/create.response.js'
import type { ChatsGetByUserRequest } from './dto/chats/get-by-user/get-by-user.request.js'
import type { ChatsGetByUserResponse } from './dto/chats/get-by-user/get-by-user.response.js'
import type { ChatsMyResponse } from './dto/chats/my/my.response.js'
import type { ChatsSendMessageRequest } from './dto/chats/send-message/send-message.request.js'
import type { ChatsSendMessageResponse } from './dto/chats/send-message/send-message.response.js'
import type { ConfirmationEmailGetCodeResponse } from './dto/confirmation/email/get-code/get-code.response.js'
import type { ConfirmationEmailSendCodeRequest } from './dto/confirmation/email/send-code/send-code.request.js'
import type { ConfirmationEmailSendCodeResponse } from './dto/confirmation/email/send-code/send-code.response.js'
import type { ConfirmationPhoneGetCodeResponse } from './dto/confirmation/phone/get-code/get-code.response.js'
import type { ConfirmationPhoneSendCodeRequest } from './dto/confirmation/phone/send-code/send-code.request.js'
import type { ConfirmationPhoneSendCodeResponse } from './dto/confirmation/phone/send-code/send-code.response.js'
import type { ItemsActivateRequest } from './dto/items/activate/activate.request.js'
import type { ItemsActivateResponse } from './dto/items/activate/activate.response.js'
import type { ItemsCreateRequest } from './dto/items/create/create.request.js'
import type { ItemsCreateResponse } from './dto/items/create/create.response.js'
import type { ItemsDeactivateRequest } from './dto/items/deactivate/deactivate.request.js'
import type { ItemsDeactivateResponse } from './dto/items/deactivate/deactivate.response.js'
import type { ItemsDeleteRequest } from './dto/items/delete/delete.request.js'
import type { ItemsDeleteResponse } from './dto/items/delete/delete.response.js'
import type { ItemsGetByAuthorRequest } from './dto/items/get-by-author/get-by-author.request.js'
import type { ItemsGetByAuthorResponse } from './dto/items/get-by-author/get-by-author.response.js'
import type { ItemsGetByIdRequest } from './dto/items/get-by-id/get-by-id.request.js'
import type { ItemsGetByIdResponse } from './dto/items/get-by-id/get-by-id.response.js'
import type { ItemsMyResponse } from './dto/items/my/my.response.js'
import type { ItemsSearchRequest } from './dto/items/search/search.request.js'
import type { ItemsSearchResponse } from './dto/items/search/search.response.js'
import type { ItemsUpdateRequest } from './dto/items/update/update.request.js'
import type { ItemsUpdateResponse } from './dto/items/update/update.response.js'
import type { LoginRequest } from './dto/login/login.request.js'
import type { LoginResponse } from './dto/login/login.response.js'
import type { PasswordResetGetCodeRequest } from './dto/password-reset/get-code/get-code.request.js'
import type { PasswordResetGetCodeResponse } from './dto/password-reset/get-code/get-code.response.js'
import type { PasswordResetSendCodeRequest } from './dto/password-reset/send-code/send-code.request.js'
import type { PasswordResetSendCodeResponse } from './dto/password-reset/send-code/send-code.response.js'
import type { ProfileChangePasswordRequest } from './dto/profile/change-password/change-password.request.js'
import type { ProfileChangePasswordResponse } from './dto/profile/change-password/change-password.response.js'
import type { ProfileCreateRequest } from './dto/profile/create/create.request.js'
import type { ProfileCreateResponse } from './dto/profile/create/create.response.js'
import type { ProfileMyResponse } from './dto/profile/my/my.response.js'
import type { ProfileUpdateRequest } from './dto/profile/update/update.request.js'
import type { ProfileUpdateResponse } from './dto/profile/update/update.response.js'
import type { GenericResponse } from './generic-response.js'

export interface GetRoute<RouteResponse extends GenericResponse = GenericResponse> {
    method: 'get'
    response: RouteResponse
}

export interface PostRoute<RouteRequest extends object = object, RouteResponse extends GenericResponse = GenericResponse> {
    method: 'post'
    request: RouteRequest
    response: RouteResponse
}

export interface ApiSchema {
    '/login': PostRoute<LoginRequest, LoginResponse>

    '/confirmation/email/get-code': GetRoute<ConfirmationEmailGetCodeResponse>
    '/confirmation/email/send-code': PostRoute<ConfirmationEmailSendCodeRequest, ConfirmationEmailSendCodeResponse>
    '/confirmation/phone/get-code': GetRoute<ConfirmationPhoneGetCodeResponse>
    '/confirmation/phone/send-code': PostRoute<ConfirmationPhoneSendCodeRequest, ConfirmationPhoneSendCodeResponse>

    '/password-reset/get-code': PostRoute<PasswordResetGetCodeRequest, PasswordResetGetCodeResponse>
    '/password-reset/send-code': PostRoute<PasswordResetSendCodeRequest, PasswordResetSendCodeResponse>

    '/profile/update': PostRoute<ProfileUpdateRequest, ProfileUpdateResponse>
    '/profile/my': GetRoute<ProfileMyResponse>
    '/profile/change-password': PostRoute<ProfileChangePasswordRequest, ProfileChangePasswordResponse>
    '/profile/create': PostRoute<ProfileCreateRequest, ProfileCreateResponse>

    '/items/create': PostRoute<ItemsCreateRequest, ItemsCreateResponse>
    '/items/my': GetRoute<ItemsMyResponse>
    '/items/deactivate': PostRoute<ItemsDeactivateRequest, ItemsDeactivateResponse>
    '/items/activate': PostRoute<ItemsActivateRequest, ItemsActivateResponse>
    '/items/delete': PostRoute<ItemsDeleteRequest, ItemsDeleteResponse>
    '/items/search': PostRoute<ItemsSearchRequest, ItemsSearchResponse>
    '/items/get-by-id': PostRoute<ItemsGetByIdRequest, ItemsGetByIdResponse>
    '/items/get-by-author': PostRoute<ItemsGetByAuthorRequest, ItemsGetByAuthorResponse>
    '/items/update': PostRoute<ItemsUpdateRequest, ItemsUpdateResponse>

    '/categories': GetRoute<CategoriesResponse>

    '/chats/my': GetRoute<ChatsMyResponse>
    '/chats/create': PostRoute<ChatsCreateRequest, ChatsCreateResponse>
    '/chats/get-by-user': PostRoute<ChatsGetByUserRequest, ChatsGetByUserResponse>
    '/chats/send-message': PostRoute<ChatsSendMessageRequest, ChatsSendMessageResponse>

    '/admin/add-option': PostRoute<AdminAddOptionRequest, AdminAddOptionResponse>
    '/admin/add-property': PostRoute<AdminAddPropertyRequest, AdminAddOptionResponse>
}

export type ApiPaths = Extract<keyof ApiSchema, string>

export type ApiPathsGet = {
    [Path in keyof ApiSchema]: ApiSchema[Path] extends GetRoute ? Path : never
}[ApiPaths]

export type ApiPathsPost = {
    [Path in keyof ApiSchema]: ApiSchema[Path] extends PostRoute ? Path : never
}[ApiPaths]
