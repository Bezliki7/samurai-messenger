import { HeaderAPI } from "../api/api"
import { stopSubmit } from "redux-form"

let SET_USER_DATA = 'auth/SET-USER-DATA'

let initialState = {
    email: null,
    id: null,
    login: null,
    isAuth: false,
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
const setUserDataAC = (email, id, login, isAuth) => ({ type: SET_USER_DATA, payload: { email, id, login, isAuth } })

export const getUserAuthDataTC = () =>
    async (dispatch) => {
        let data = await HeaderAPI.getUserAuthData()

        if (data.resultCode == 0) {
            let { email, id, login } = data.data
            dispatch(setUserDataAC(email, id, login, true))
        }
    }

export const loginTC = (email, password, rememberMe) =>
    async (dispatch) => {
        let response = await HeaderAPI.Login(email, password, rememberMe)

        if (response.data.resultCode === 0) {
            dispatch(getUserAuthDataTC())
        }
        dispatch(stopSubmit('login', { _error: response.data.messages }))
    }

export const logoutTC = () =>
    async (dispatch) => {
        let response = await HeaderAPI.Logout()

        if (response.data.resultCode === 0) {
            dispatch(setUserDataAC(null, null, null, false))
        }
    }

export default authReducer