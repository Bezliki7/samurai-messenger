import { UsersApi } from "../api/api"

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'
const SET_PAGE = 'SET-PAGE'
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING '
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE-IS-FOLLOWING-PROGRESS'

let initialState = {
    users: [],
    pageSize: 5,
    totalUsers: 295,
    currentPage: 1,
    isFetching: false,
    isFollowing: []
}

function usersReducer(state = initialState, action) {
    switch (action.type) {
        case FOLLOW: {
            let stateCopy = {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: true }
                    }
                    return u
                })
            }
            return stateCopy
        }
        case UNFOLLOW: {
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: false }
                    }
                    return u
                })
            }
        }
        case SET_USERS: {
            return {
                ...state,
                users: [...action.users]
            }
        }
        case SET_PAGE:
            return {
                ...state,
                currentPage: action.page
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                isFollowing:
                    action.isFollowing
                        ? [...state.isFollowing, action.uId]
                        : state.isFollowing.filter(id => id != action.uId)
            }
        }

        default: return state
    }
}

export const setUsersAC = (u) => ({ type: SET_USERS, users: u })
export const followAC = (uId) => ({ type: FOLLOW, userId: uId })
export const unfollowAC = (uId) => ({ type: UNFOLLOW, userId: uId })
export const setPageAC = (p) => ({ type: SET_PAGE, page: p })
export const toggleIsFetchingAC = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })
export const toggleIsFollowingAC = (isFollowing, uId) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFollowing, uId })

export const getUserThunkCreator = (currentPage, pageSize) => {
    return (dispatch) => {
        dispatch(toggleIsFetchingAC(true))
        UsersApi.getUser(currentPage, pageSize)
            .then(data => {
                dispatch(setUsersAC(data.items))
                dispatch(toggleIsFetchingAC(false))
            }
            )
    }
}

export const unfollowTC = (id) => {
    return (dispatch) => {
    dispatch(toggleIsFollowingAC(true, id))
    UsersApi.unfollow(id)
        .then(data => {
            if (data.resultCode == 0) { dispatch(unfollowAC(id)) }
            dispatch(toggleIsFollowingAC(false, id))
        })
}}

export const followTC = (id) => {
    return (dispatch) => {
    dispatch(toggleIsFollowingAC(true, id))
    UsersApi.follow(id)
        .then(data => {
            if (data.resultCode == 0) { dispatch(followAC(id)) }
            dispatch(toggleIsFollowingAC(false, id))
        })
}}



export default usersReducer
