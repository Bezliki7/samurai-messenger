import { HeaderAPI, securityAPI } from "../api/api"
import { stopSubmit } from "redux-form"

let SET_USER_DATA = 'auth/SET-USER-DATA'

let initialState = {
    email: null,
    id: null,
    login: null,
    isAuth: false,
    captcha: null,
}

function authReducer(state = initialState, action) {
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
const setUserDataAC = (email, id, login, isAuth, captcha) => ({ type: SET_USER_DATA, payload: { email, id, login, isAuth, captcha } })

export const getUserAuthDataTC = () =>
    async (dispatch) => {
        let data = await HeaderAPI.getUserAuthData()

        if (data.resultCode == 0) {
            let { email, id, login } = data.data
            dispatch(setUserDataAC(email, id, login, true))
        }
    }

export const loginTC = (email, password, rememberMe, captcha) =>
    async (dispatch) => {
        let response = await HeaderAPI.Login(email, password, rememberMe, captcha)

        if (response.data.resultCode === 0) {
            dispatch(getUserAuthDataTC())
        } else {
            if (response.data.resultCode === 10) {
                dispatch(getCaptcha())
            }
            dispatch(stopSubmit('login', { _error: response.data.messages }))
        }
        
    }

export const logoutTC = () =>
    async (dispatch) => {
        let response = await HeaderAPI.Logout()

        if (response.data.resultCode === 0) {
            dispatch(setUserDataAC(null, null, null, false))
        }
    }

export const getCaptcha = () => 
    async dispatch => {
        let response = await securityAPI.getCaptcha()
        console.log(response)
        dispatch(setUserDataAC(null, null, null, null, response.data.url))
    }

export default authReducer