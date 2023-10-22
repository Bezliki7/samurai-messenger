import { createSelector } from 'reselect'

const getUsersSelector = (state) => {
    return state.usersPage.users.filter(u => true)
}

export const getUsers = createSelector(getUsersSelector, users => {
    return users.filter(u => true)
})

export const getPage = (state) => {
    return state.usersPage.currentPage
}

export const getTotalUsers = (state) => {
    return state.usersPage.totalUsers
}

export const getPageSize = (state) => {
    return state.usersPage.pageSize
}

export const getIsFollowing = (state) => {
    return state.usersPage.isFollowing
}