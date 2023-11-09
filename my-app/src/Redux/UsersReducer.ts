import { UsersType } from '../types/Types';
import { userToFollowUnfollow } from "../components/Utils/object-helpers"
import { InfernActionsType, ThunkActionType } from './redux-store';
import { UsersApi, UsersApiType} from '../api/usersApi';
import { resultCodes } from '../api/api';

let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 5,
    totalUsers: 2000 as number | undefined,
    page: 1,
    term: '',
    friend: null as null|boolean|undefined,
    isFetching: false,
    isFollowing: [] as Array<number>,
}

function usersReducer(state = initialState, action: ActionsType):InitialStateType {
    switch (action.type) {
        case 'FOLLOW': {
            return {
                ...state,
                users: userToFollowUnfollow(state.users, 'id', action.userId, { followed: true })
            }
        }
        case 'UNFOLLOW': {
            return {
                ...state,
                users: userToFollowUnfollow(state.users, 'id', action.userId, { followed: false })
            }
        }
        case 'SET_USERS': {
            return {
                ...state,
                users: [...action.users]
            }
        }
        case 'SET_PAGE':
            return {
                ...state,
                totalUsers: action.totalUsers,
                page: action.page,
                term: action.term,
                friend: action.friend
            }
        case 'TOGGLE_IS_FETCHING':
            return {
                ...state,
                isFetching: action.isFetching
            }
        case 'TOGGLE_IS_FOLLOWING_PROGRESS': {
            return {
                ...state,
                isFollowing:
                    action.isFetching
                        ? [...state.isFollowing, action.uId]
                        : state.isFollowing.filter(id => id != action.uId)
            }
        }
        default: return state
    }
}

export const usersActions = {
    setUsersAC: (u:Array<UsersType>) => ({ type: 'SET_USERS', users: u } as const ),
    followAC: (uId:number) => ({ type: 'FOLLOW', userId: uId } as const ),
    unfollowAC: (uId:number) => ({ type: 'UNFOLLOW', userId: uId } as const ),
    setPageAC: (page:number,term:string, totalUsers?:number, friend?:null|boolean)=>({type:'SET_PAGE',page,totalUsers,term,friend} as const ),
    toggleIsFetchingAC: (isFetching:boolean) => ({ type: 'TOGGLE_IS_FETCHING', isFetching } as const ),
    toggleIsFollowingAC: (isFetching: boolean, uId: number) =>({ type: 'TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, uId } as const )
}

export const getUserThunkCreator = (page:number, pageSize:number, term:string = '',friend:boolean|null=null):ThunkActionType<ActionsType> =>
    async (dispatch) => {
        dispatch(usersActions.toggleIsFetchingAC(true))
        let data = await UsersApi.getUser(page, pageSize, term, friend)
        dispatch(usersActions.setPageAC(page ,term ,data.totalCount,friend))
        dispatch(usersActions.setUsersAC(data.items))
        dispatch(usersActions.toggleIsFetchingAC(false))
    }

const followUnfollowFlow = (id:number, actionCreator:(id:number) => ActionsType,
                            apiMethod:(id:number) => Promise<UsersApiType>):ThunkActionType<ActionsType> =>
    async (dispatch) => {
        try {
            dispatch(usersActions.toggleIsFollowingAC(true, id))
            let data = await apiMethod(id)
            if (data.resultCode == resultCodes.Success) { dispatch(actionCreator(id)) }
            dispatch(usersActions.toggleIsFollowingAC(false, id))
        }
        catch (err) { console.error(err) }
    }

export const unfollowTC = (id:number) => followUnfollowFlow(id, usersActions.unfollowAC, UsersApi.unfollow)

export const followTC = (id:number) => followUnfollowFlow(id, usersActions.followAC, UsersApi.follow)

type ActionsType = InfernActionsType<typeof usersActions>
type InitialStateType = typeof initialState

export default usersReducer
