import { ResponseType, instance, resultCodes, resultCodesWithCapthca } from './api';

export type GetUserAuthDataType = ResponseType<{ id: number, email: string, login: string, captcha: string | null }, resultCodes>
export type LoginType = ResponseType<{ userId: number }, resultCodes | resultCodesWithCapthca>

export const HeaderAPI = {
    getUserAuthData() {
        return instance.get<GetUserAuthDataType>("auth/me")
            .then(response => response.data)
    },
    Login(email: string, password: string, remembreMe = false, captcha: string | null = null) {
        return instance.post<LoginType>('auth/login', { email, password, remembreMe, captcha })
            .then(response => response.data)
    },
    Logout() {
        return instance.delete('auth/login').then(response => response.data) as Promise<ResponseType>

    }
}
