import { stopSubmit } from "redux-form"
import { ProfilesAPI } from "../api/api"

let ADD_POST = 'ADD-POST'
let DELETE_POST = 'DELETE-POST'
let UPDATE_NEW_POST = 'UPDATE-NEW-POST'
let SET_PROFILE = 'profile/SET-PROFILE'
let GET_USER_STATUS = 'GET-USER-STATUS'
let CHANGE_PHOTO = 'CHANGE-PHOTO'
let SET_EDIT_MODE = 'SET-EDIT-MODE'

type InitialStateType = typeof initialState
type DataPostType = {
    id: number
    post: string
    likes: number
}
type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type PhotosType = {
    small: string | null
    large: string | null
}
type DescriptionType = {
    aboutMe: string
    contacts: ContactsType
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    photos: PhotosType
}

let initialState = {
    datapost: [{ id: 1, post: ".", likes: 15 }] as Array<DataPostType> ,
    newPost: '',
    description: {} as DescriptionType,
    status: '',
    editMode: false,
}

function profileReducer(state = initialState, action:any):InitialStateType {
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

type AddPostActionType = {
    type: typeof ADD_POST,
    post: string
}
export const addPostCreator = (post:string):AddPostActionType => ({ type: ADD_POST, post })
type DeletePostAction = {
    type: typeof DELETE_POST,
    postId: number
}
export const deletePostAC = (postId:number):DeletePostAction => ({ type: DELETE_POST, postId })
type UpdateNewPostActionType = {
    type: typeof UPDATE_NEW_POST,
    post: string
}
export const updateNewPostCreator = (post:string):UpdateNewPostActionType => ({ type: UPDATE_NEW_POST, post })
type SetProfileActionType = {
    type: typeof SET_PROFILE,
    data: DescriptionType
}
export const setProfileAC = (data:DescriptionType):SetProfileActionType => ({ type: SET_PROFILE, data })
type GetUserStatusActionType = {
    type: typeof GET_USER_STATUS,
    status: string
}
const getUserStatusAC = (status:string):GetUserStatusActionType => ({ type: GET_USER_STATUS, status })
type ChangePhotoSuccessActionType = {
    type: typeof CHANGE_PHOTO,
    photoFile: PhotosType
}
const changePhotoSuccess = (photoFile:PhotosType):ChangePhotoSuccessActionType => ({ type: CHANGE_PHOTO, photoFile })
type SetEditModeSuccessActionType = {
    type: typeof SET_EDIT_MODE,
    status: boolean
}
export const setEditModeSuccess = (status:boolean):SetEditModeSuccessActionType => ({ type: SET_EDIT_MODE, status })


export const changePhotoTC = (photo:PhotosType) =>
    async (dispatch:any) => {
        let response = await ProfilesAPI.ChangePhoto(photo)
        dispatch(changePhotoSuccess(response.data.data))
    }

export const ChangeProfileContactsTC = (media:ContactsType) =>
    async (dispatch:any, getState:any) => {
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

export const getProfileTC = (userId:number) =>
    async (dispatch:any) => {
        let data = await ProfilesAPI.getProfile(userId)

        return (dispatch(setProfileAC(data)))
    }

export const getUserStatusTC = (uId:number) =>
    async (dispatch:any) => {
        let response = await ProfilesAPI.getUserStatus(uId)

        dispatch(getUserStatusAC(response.data))
    }

export const updateStatusTC = (status:string) =>
    async (dispatch:any) => {
        try {
            let response = await ProfilesAPI.UpdateStatus(status)

            if (response.data.resultCode === 0) {
                dispatch(getUserStatusAC(status))
            }
        }
        catch (err) { console.error(err) }

    }

export default profileReducer