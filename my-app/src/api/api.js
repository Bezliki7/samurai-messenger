import axios from "axios"


const instance = axios.create(
    {
        withCredentials: true,
        baseURL: 'https://social-network.samuraijs.com/api/1.0/',
        headers: { "API-KEY": "4fac7951-cc84-4f1b-b9ec-4b8a8d3bbfe2" }
    }
)

export const UsersApi = {
    getUser(currentPage, pageSize) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => { return response.data })
    },
    unfollow(id) {
        return instance.delete(`follow/${id}`)
            .then(response => { return response.data })
    },
    follow(id) {
        return instance.post(`follow/${id}`)
            .then(response => { return response.data })
    },
}

export const ProfilesAPI = {
    getProfile(userId) {
        return instance.get(`profile/` + userId)
            .then(response => { return response.data })
    },
    getUserStatus(id) {
        return instance.get('/profile/status/' + id)
    },
    UpdateStatus(status) {
        return instance.put('profile/status', { status: status })
    },
    ChangePhoto(photoFile) {
        const formData = new FormData();
        formData.append('image', photoFile)
        return instance.put('/profile/photo', formData, { headers: { 'Content-type': 'multipart/form-data' } })
    },
    ChangeProfileInfo(media, info) {
        return instance.put('/profile',
            {
                ...info,
                contacts: { ...media },
            })
    }
}

export const HeaderAPI = {
    getUserAuthData() {
        return instance.get("auth/me")
            .then(response => { return response.data })
    },
    Login(email, password, remembreMe = false, captcha = null) {
        return (
            instance.post('auth/login', { email, password, remembreMe, captcha })
        )
    },
    Logout() {
        return (
            instance.delete('auth/login')
        )
    }
}

export const securityAPI = {
    getCaptcha() {
        return instance.get('security/get-captcha-url')
    }
}
