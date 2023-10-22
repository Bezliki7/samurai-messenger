import axios from "axios"


const instance = axios.create(
    {
        withCredentials: true,
        baseURL: 'https://social-network.samuraijs.com/api/1.0/',
        headers: {"API-KEY": "b44d43c9-53ff-470e-9f08-020c4db9c420"}
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
    }
}

export const HeaderAPI = {
    getUserAuthData() {
        return instance.get("auth/me")
            .then(response => { return response.data })
    },
    Login(email, password, remembreMe = false) {
        return (
            instance.post('auth/login', {email, password, remembreMe})
        )
    },
    Logout() {
        return (
            instance.delete('auth/login')
        )
    }
}
