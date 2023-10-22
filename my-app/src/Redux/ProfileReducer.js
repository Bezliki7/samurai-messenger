import { ProfilesAPI } from "../api/api"

let ADD_POST = 'ADD-POST'
let DELETE_POST = 'DELETE-POST'
let UPDATE_NEW_POST = 'UPDATE-NEW-POST'
let SET_PROFILE = 'profile/SET-PROFILE'
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
            stateCopy.newPost = ''
            return stateCopy
        }
        case DELETE_POST: {
            return {
                ...state,
                datapost: state.datapost.filter(post => { return post.id !== action.postId })
            }
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
export const deletePostAC = (postId) => ({ type: DELETE_POST, postId })
export const updateNewPostCreator = (post) => ({ type: UPDATE_NEW_POST, post: post })
export const setProfileAC = (data) => ({ type: SET_PROFILE, data })
const getUserStatusAC = (status) => ({ type: GET_USER_STATUS, status })

export const getProfileTC = (userId) =>
    async (dispatch) => {
        let data = await ProfilesAPI.getProfile(userId)

        return (dispatch(setProfileAC(data)))
    }

export const getUserStatusTC = (uId) =>
    async (dispatch) => {
        let response = await ProfilesAPI.getUserStatus(uId)

        dispatch(getUserStatusAC(response.data))
    }

export const updateStatusTC = (status) => 
    async (dispatch) => {
        let response = await ProfilesAPI.UpdateStatus(status)
        
        if (response.data.resultCode === 0) {
            dispatch(getUserStatusAC(status))
        }
    }

export default profileReducer