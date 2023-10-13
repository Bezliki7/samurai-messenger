import { HeaderAPI } from "../api/api"

let SET_USER_DATA = 'SET-USER-DATA'

let initialState = {
    email: null,
    id: null,
    login: null,
    isAuth: false
}

function authReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.userAuthData,
                isAuth: true
            }
        }
            
        default: return state
    }
}
export const setUserDataAC = ( email, id, login ) => ({ type: SET_USER_DATA, userAuthData:{email, id, login} })

export const getUserAuthDataTC = () => {
    return (dispatch) => {
    HeaderAPI.getUserAuthData()
            .then(data => { {
                if (data.resultCode == 0) {
                    let {email,id, login} = data.data
                    dispatch(setUserDataAC(email,id, login))}  }
            })
}}


export default authReducer