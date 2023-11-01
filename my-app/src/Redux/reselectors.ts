import { createSelector } from 'reselect'
import { AppStateType } from './redux-store'



const getUsersSelector = (state: AppStateType) => {
    return state.usersPage.users.filter(u => true)
}

export const getUsers = createSelector(getUsersSelector, users => {
    return users.filter(u => true)
})

export const getPage = (state: AppStateType) => {
    return state.usersPage.currentPage
}

export const getTotalUsers = (state: AppStateType) => {
    return state.usersPage.totalUsers
}

export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize
}

export const getIsFollowing = (state: AppStateType) => {
    return state.usersPage.isFollowing
}

export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching
}

export const getIsAuth = (state: AppStateType) => {
    return state.auth.isAuth
}

export const getCaptcha = (state: AppStateType) => {
    return state.auth.captcha
}

