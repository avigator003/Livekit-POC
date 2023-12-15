export interface RegisteringUser {
    phoneNumber: string,
    name: string,
    username: string,
    password: string,
    token: string | null,
    profile_photo: string | null,
}