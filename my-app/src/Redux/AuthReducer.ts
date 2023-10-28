import { HeaderAPI, securityAPI } from "../api/api"
import { stopSubmit } from "redux-form"

let SET_USER_DATA = 'auth/SET-USER-DATA'

type InitialStateType = typeof initialState

let initialState = {
    email: null as string | null,
    id: null as number | null,
    login: null as string | null,
    isAuth: false,
    captcha: null as string | null,
}


function authReducer(state = initialState, action: setUserDataActionType): InitialStateType {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.payload,
            }
        }
        default: return state
    }
}
type payloadType = {
    email: string | null
    id: number | null
    login: string | null
    isAuth: boolean
    captcha: string | null
}

type setUserDataActionType = {
    type: typeof SET_USER_DATA,
    payload: payloadType

}

const setUserDataAC = (email: string | null, id: number | null, login: string | null, isAuth: boolean, captcha: string | null):
    setUserDataActionType =>
    ({ type: SET_USER_DATA, payload: { email, id, login, isAuth, captcha } })

export const getUserAuthDataTC = () =>
    async (dispatch: any) => {
        let data = await HeaderAPI.getUserAuthData()

        if (data.resultCode == 0) {
            let { email, id, login, isAuth, captcha } = data.data
            dispatch(setUserDataAC(email, id, login, true, captcha))
        }
    }

export const loginTC = (email: string, password: string, rememberMe: boolean, captcha: any) =>
    async (dispatch: any) => {
        let response = await HeaderAPI.Login(email, password, rememberMe, captcha)

        if (response.data.resultCode === 0) {
            dispatch(getUserAuthDataTC())
        } 
        else {
            if (response.data.resultCode === 10) {
                dispatch(getCaptcha())
            }
            dispatch(stopSubmit('login', { _error: response.data.messages }))
        }
    }

export const logoutTC = () =>
    async (dispatch: any) => {
        let response = await HeaderAPI.Logout()

        if (response.data.resultCode === 0) {
            dispatch(setUserDataAC(null, null, null, false, null))
        }
    }

export const getCaptcha = () =>
    async (dispatch: any) => {
        let response = await securityAPI.getCaptcha()
        dispatch(setUserDataAC(null, null, null, false, response.data.url))
    }

export default authReducer