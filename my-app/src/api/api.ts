import axios from "axios"

export const instance = axios.create(
    {
        withCredentials: true,
        baseURL: 'https://social-network.samuraijs.com/api/1.0/',
        headers: { "API-KEY": "4fac7951-cc84-4f1b-b9ec-4b8a8d3bbfe2" }
    }
)

export enum resultCodes {
    Success = 0,
    Failed = 1
}

export enum resultCodesWithCapthca {
    CaptchaIsRequired = 10
}

export type ResponseType<T={}  , U = resultCodes > = {
    data: T,
    resultCode: U,
    messages: Array<string>
} 

