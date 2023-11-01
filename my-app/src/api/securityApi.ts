import { instance } from './api';

type getCaptchaType = {
    url: string
}

export const securityAPI = {
    getCaptcha() {
        return instance.get<getCaptchaType>('security/get-captcha-url')
            .then(res => res.data)
    }
}
