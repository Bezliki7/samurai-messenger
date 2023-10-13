import { ProfilesAPI } from "../api/api"

let ADD_POST = 'ADD-POST'
let UPDATE_NEW_POST = 'UPDATE-NEW-POST'
let SET_PROFILE = 'SET-PROFILE'
let GET_USER_STATUS = 'GET-USER-STATUS'

let initialState = {
    datapost: [{ id: 1, post: "я выучу реакт", likes: 15 },
    { id: 2, post: "привет", likes: 12 }],
    newPost: '',
    description: {},
    status: ''
}

function profileReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_POST: {
            let stateCopy = { ...state }
            stateCopy.datapost = [...state.datapost]
            stateCopy.datapost.push({ id: 3, post: action.post, likes: 0 })
            // stateCopy.newPost = ''
            return stateCopy
        }
        case UPDATE_NEW_POST: {
            let stateCopy = { ...state }
            stateCopy.newPost = action.post
            return stateCopy
        }
        case SET_PROFILE: {
            return {
                ...state,
                description: { ...action.data }
            }
        }
        case GET_USER_STATUS: {
            return {
                ...state,
                status: action.status 
            }
        }

        default: return state
    }
}

export const addPostCreator = (post) => ({ type: ADD_POST, post })
export const updateNewPostCreator = (post) => ({ type: UPDATE_NEW_POST, post: post })
export const setProfileAC = (data) => ({ type: SET_PROFILE, data })
const getUserStatusAC = (status) => ({ type: GET_USER_STATUS, status })

export const getProfileTC = (userId) => {
    return (dispatch) => {
        ProfilesAPI.getProfile(userId)
            .then(data => {
                return (dispatch(setProfileAC(data)))
            })
    }
}
export const getUserStatusTC = (uId) => {
    return (dispatch) => {
        ProfilesAPI.getUserStatus(uId)
            .then(response => {
                dispatch(getUserStatusAC(response.data))
            })
    }
}
export const updateStatusTC = (status) => {
    return (dispatch) => {
        ProfilesAPI.UpdateStatus(status)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(getUserStatusAC(status))
                }
            })
    }
}
export default profileReducer