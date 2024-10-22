export interface MyProfileData {
    id: number
    firstName: string
    lastName: string
    email: string
    phone: string
    emailConfirmed: boolean
    phoneConfirmed: boolean
    role: 'USER' | 'ADMIN'
}
