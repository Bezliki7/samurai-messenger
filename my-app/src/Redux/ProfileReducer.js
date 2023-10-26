import { stopSubmit } from "redux-form"
import { ProfilesAPI } from "../api/api"

let ADD_POST = 'ADD-POST'
let DELETE_POST = 'DELETE-POST'
let UPDATE_NEW_POST = 'UPDATE-NEW-POST'
let SET_PROFILE = 'profile/SET-PROFILE'
let GET_USER_STATUS = 'GET-USER-STATUS'
let CHANGE_PHOTO = 'CHANGE-PHOTO'
let SET_EDIT_MODE = 'SET-EDIT-MODE'

let initialState = {
    datapost: [{ id: 1, post: ".", likes: 15 }],
    newPost: '',
    description: {},
    status: '',
    editMode: false,
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
        case CHANGE_PHOTO: {
            return {
                ...state,
                description: { ...state.description, ...action.photoFile }
            }
        }
        case SET_EDIT_MODE: {
            return {
                ...state,
                editMode: action.status
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
const changePhotoSuccess = (photoFile) => ({ type: CHANGE_PHOTO, photoFile })
export const setEditModeSuccess = (status) => ({ type: SET_EDIT_MODE, status })


export const changePhotoTC = (photo) =>
    async (dispatch) => {
        let response = await ProfilesAPI.ChangePhoto(photo)
        dispatch(changePhotoSuccess(response.data.data))
    }

export const ChangeProfileContactsTC = (media) =>
    async (dispatch, getState) => {
        let userId = getState().auth.id
        let description = getState().profilePage.description

        const response = await ProfilesAPI.ChangeProfileInfo(media, description)
        if (response.data.resultCode == 0) {
            dispatch(getProfileTC(userId))
            dispatch(setEditModeSuccess(false))
        } else {
            dispatch(stopSubmit('contacts', { _error: response.data.messages }))
        }
    }

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
        try {
            let response = await ProfilesAPI.UpdateStatus(status)

            if (response.data.resultCode === 0) {
                dispatch(getUserStatusAC(status))
            }
        }
        catch (err) { console.error(err) }

    }

export default profileReducer