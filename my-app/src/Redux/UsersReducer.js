const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'

let initialState = {
    users: []
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
                users: [...state.users, ...action.users]
            }
        }
        default: return state
    }
}

export const setUsersAC = (u) => ({ type: SET_USERS, users: u })
export const followAC = (uId) => ({ type: FOLLOW, userId: uId })
export const unfollowAC = (uId) => ({ type: UNFOLLOW, userId: uId })

export default usersReducer
