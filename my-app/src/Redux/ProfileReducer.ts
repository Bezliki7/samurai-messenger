import { FormAction, stopSubmit } from "redux-form"
import { ContactsType, DataPostType, DescriptionType, PhotosType } from "../types/Types"
import { AppStateType, InfernActionsType, ThunkActionType } from "./redux-store"
import { ProfilesAPI } from "../api/profilesApi"
import { resultCodes } from "../api/api"

let initialState = {
    datapost: [{ id: 1, post: ".", likes: 15 }] as Array<DataPostType>,
    newPost: '',
    description: {} as DescriptionType,
    status: '',
    editMode: false as boolean,
}

function profileReducer(state = initialState, action: ActionsType): InitialStateType {
    switch (action.type) {
        case "ADD_POST": {
            return {
                ...state,
                datapost: [...state.datapost, { id: 2, post: action.post, likes: 0 }],
                newPost: ''
            }
        }
        case "DELETE_POST": {
            return {
                ...state,
                datapost: state.datapost.filter(p => { return p.id !== action.postId })
            }
        }
        case "UPDATE_NEW_POST": {
            return {
                ...state,
                newPost: action.postt
            }
        }
        case "SET_PROFILE": {
            return {
                ...state,
                description: { ...action.data }
            }
        }
        case "GET_USER_STATUS": {
            return {
                ...state,
                status: action.status
            }
        }
        case "CHANGE_PHOTO": {
            return {
                ...state,
                description: { ...state.description, ...action.photoFile }
            }
        }
        case "SET_EDIT_MODE": {
            return {
                ...state,
                editMode: action.status
            }
        }
        default: return state
    }
}

export const actions = {
    addPostCreator: (post: string) => ({ type: 'ADD_POST', post } as const ),
    deletePostAC: (postId: number) => ({ type: 'DELETE_POST', postId } as const ),
    updateNewPostCreator: (postt: string) => ({ type: 'UPDATE_NEW_POST', postt } as const ),
    setProfileAC: (data: DescriptionType) => ({ type: 'SET_PROFILE', data } as const ),
    getUserStatusAC: (status: string) => ({ type: 'GET_USER_STATUS', status } as const ),
    changePhotoSuccess: (photoFile: PhotosType) => ({ type: 'CHANGE_PHOTO', photoFile } as const ),
    setEditModeSuccess: (status: boolean) => ({ type: 'SET_EDIT_MODE', status } as const ),
}

export const changePhotoTC = (photo: PhotosType):ThunkActionType<ActionsType> =>
    async (dispatch) => {
        let data = await ProfilesAPI.ChangePhoto(photo)
        dispatch(actions.changePhotoSuccess(data.data))
    }

export const ChangeProfileContactsTC = (media: ContactsType): ThunkActionType<ActionsType | FormAction> =>
    async (dispatch, getState: () => AppStateType) => {
        let userId = getState().auth.id
        let description = getState().profilePage.description

        const data = await ProfilesAPI.ChangeProfileInfo(media, description)
        if (data.resultCode == resultCodes.Success) {
            dispatch(getProfileTC(userId))
            dispatch(actions.setEditModeSuccess(false))
        } else {
            dispatch(stopSubmit('contacts', { _error: data.messages }))
        }
    }

export const getProfileTC = (userId: number | null): ThunkActionType<ActionsType> =>
    async (dispatch) => {
        let data = await ProfilesAPI.getProfile(userId)

        dispatch(actions.setProfileAC(data))
    }

export const getUserStatusTC = (uId: number):ThunkActionType<ActionsType> =>
    async (dispatch) => {
        let response = await ProfilesAPI.getUserStatus(uId)

        dispatch(actions.getUserStatusAC(response.data))
    }

export const updateStatusTC = (status: string): ThunkActionType<ActionsType> =>
    async (dispatch) => {
        try {
            let data = await ProfilesAPI.UpdateStatus(status)

            if (data.resultCode === resultCodes.Success) {
                dispatch(actions.getUserStatusAC(status))
            }
        }
        catch (err) { console.error(err) }

    }

export type InitialStateType = typeof initialState
type ActionsType = InfernActionsType<typeof actions>

export default profileReducer