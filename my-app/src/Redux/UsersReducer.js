import { UsersApi } from "../api/api"
import { userToFollowUnfollow } from "../components/Utils/object-helpers"

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'users/SET-USERS'
const SET_PAGE = 'SET-PAGE'
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING '
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE-IS-FOLLOWING-PROGRESS'
const SET_PARTS = 'SET-PARTS'

let initialState = {
    users: [],
    pageSize: 5,
    totalUsers: 2000,
    currentPage: 1,
    isFetching: false,
    isFollowing: [],
}

function usersReducer(state = initialState, action) {
    switch (action.type) {
        case FOLLOW: {
            return {
                ...state,
                users: userToFollowUnfollow(state.users,'id',action.userId, {followed: true}) 

            }
        }
        case UNFOLLOW: {
            return {
                ...state,
                users: userToFollowUnfollow(state.users, 'id', action.userId, {followed: false}) 
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

const setUsersAC = (u) => ({ type: SET_USERS, users: u })
export const followAC = (uId) => ({ type: FOLLOW, userId: uId })
export const unfollowAC = (uId) => ({ type: UNFOLLOW, userId: uId })
export const setPageAC = (p) => ({ type: SET_PAGE, page: p })
export const toggleIsFetchingAC = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })
export const toggleIsFollowingAC = (isFollowing, uId) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFollowing, uId })

export const getUserThunkCreator = (currentPage, pageSize) =>
    async (dispatch) => {
        dispatch(toggleIsFetchingAC(true))
        let data = await UsersApi.getUser(currentPage, pageSize)
        dispatch(setUsersAC(data.items))
        dispatch(toggleIsFetchingAC(false))
    }

const followUnfollowFlow = (id, actionCreator, apiMethod) => 
    async (dispatch) => {
        dispatch(toggleIsFollowingAC(true, id))
        let data = await apiMethod(id)
        if (data.resultCode == 0) { dispatch(actionCreator(id)) }
        dispatch(toggleIsFollowingAC(false, id))
    }

export const unfollowTC = (id) => followUnfollowFlow(id, unfollowAC, UsersApi.unfollow)

export const followTC = (id) => followUnfollowFlow(id, followAC, UsersApi.follow)

export default usersReducer
