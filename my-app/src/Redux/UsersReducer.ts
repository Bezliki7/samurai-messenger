import { UsersApi } from "../api/api"
import { userToFollowUnfollow } from "../components/Utils/object-helpers"
import { PhotosType } from "./ProfileReducer"

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'users/SET-USERS'
const SET_PAGE = 'SET-PAGE'
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING '
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE-IS-FOLLOWING-PROGRESS'


type UsersType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
}

let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 5,
    totalUsers: 2000,
    currentPage: 1,
    isFetching: false,
    isFollowing: [] as Array<number>,
}
type InitialStateType = typeof initialState
function usersReducer(state = initialState, action: any):InitialStateType {
    switch (action.type) {
        case FOLLOW: {
            return {
                ...state,
                users: userToFollowUnfollow(state.users, 'id', action.userId, { followed: true })

            }
        }
        case UNFOLLOW: {
            return {
                ...state,
                users: userToFollowUnfollow(state.users, 'id', action.userId, { followed: false })
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

type SetUsersActionType = {
    type: typeof SET_USERS
    users: Array<UsersType>
}
const setUsersAC = (u:Array<UsersType>):SetUsersActionType => ({ type: SET_USERS, users: u })

type followActionType = {
    type: typeof FOLLOW
    userId: number
}
export const followAC = (uId:number):followActionType => ({ type: FOLLOW, userId: uId })

type UnfollowActionType = {
    type: typeof UNFOLLOW
    userId: number
}
export const unfollowAC = (uId:number):UnfollowActionType => ({ type: UNFOLLOW, userId: uId })

type SetPageActionType = {
    type: typeof SET_PAGE
    page: number
}
export const setPageAC = (p:number):SetPageActionType => ({ type: SET_PAGE, page: p })

type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const toggleIsFetchingAC = (isFetching:boolean):ToggleIsFetchingActionType => ({ type: TOGGLE_IS_FETCHING, isFetching })

type ToggleIsFollowingActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFollowing: boolean
    uId: number
}
export const toggleIsFollowingAC = (isFollowing:boolean, uId:number):ToggleIsFollowingActionType =>
 ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFollowing, uId })

export const getUserThunkCreator = (currentPage:number, pageSize:number) =>
    async (dispatch:any) => {
        dispatch(toggleIsFetchingAC(true))
        let data = await UsersApi.getUser(currentPage, pageSize)
        dispatch(setUsersAC(data.items))
        dispatch(toggleIsFetchingAC(false))
    }

const followUnfollowFlow = (id:number, actionCreator:any, apiMethod:any) =>
    async (dispatch:any) => {
        try {
            dispatch(toggleIsFollowingAC(true, id))
            let data = await apiMethod(id)
            if (data.resultCode == 0) { dispatch(actionCreator(id)) }
            dispatch(toggleIsFollowingAC(false, id))
        }
        catch (err) { console.error(err) }

    }

export const unfollowTC = (id:number) => followUnfollowFlow(id, unfollowAC, UsersApi.unfollow)

export const followTC = (id:number) => followUnfollowFlow(id, followAC, UsersApi.follow)

export default usersReducer
