import { InfernActionsType, ThunkActionType } from './redux-store';
import { HeaderAPI } from '../api/headerApi';
import { securityAPI } from '../api/securityApi';
import { resultCodes, resultCodesWithCapthca } from './../api/api';
import { FormAction, stopSubmit } from "redux-form"

let initialState = {
    email: null as string | null,
    id: null as number | null,
    login: null as string | null,
    isAuth: false,
    captcha: null as string | null,
}

function authReducer(state = initialState, action: ActionsType): InitialStateType {
    switch (action.type) {
        case 'auth/SET-USER-DATA': {
            return {
                ...state,
                ...action.payload,
            }
        }
        default: return state
    }
}

const actions = {
    setUserDataAC: (email: string | null, id: number | null, login: string | null, isAuth: boolean, captcha: string | null) =>
        ({ type: 'auth/SET-USER-DATA', payload: { email, id, login, isAuth, captcha } } as const)
}

export const getUserAuthDataTC = (): ThunkActionType<ActionsType> =>
    async (dispatch) => {
        let data = await HeaderAPI.getUserAuthData()

        if (data.resultCode == resultCodes.Success) {
            let { email, id, login, captcha } = data.data
            dispatch(actions.setUserDataAC(email, id, login, true, captcha))
        }
    }

export const loginTC = (email: string, password: string, rememberMe: boolean, captcha: string | null)
    : ThunkActionType<ActionsType | FormAction> =>
    async (dispatch) => {
        let data = await HeaderAPI.Login(email, password, rememberMe, captcha)

        if (data.resultCode === resultCodes.Success) {
            dispatch(getUserAuthDataTC())
        }
        else {
            if (data.resultCode === resultCodesWithCapthca.CaptchaIsRequired) {
                dispatch(getCaptcha())
            }
            dispatch(stopSubmit('login', { _error: data.messages }))
        }
    }

export const logoutTC = (): ThunkActionType<ActionsType> =>
    async (dispatch) => {
        let data = await HeaderAPI.Logout()

        if (data.resultCode === resultCodes.Success) {
            dispatch(actions.setUserDataAC(null, null, null, false, null))
        }
    }

export const getCaptcha = (): ThunkActionType<ActionsType> =>
    async (dispatch) => {
        let data = await securityAPI.getCaptcha()
        dispatch(actions.setUserDataAC(null, null, null, false, data.url))
    }

type InitialStateType = typeof initialState
type ActionsType = InfernActionsType<typeof actions>

export default authReducer