import { getUserAuthDataTC } from "./AuthReducer"

let INITIALIZATION = 'app/INITIALIZATION'

let initialState = {
    initialized: false,
}



function appReducer(state = initialState, action) {
    switch (action.type) {
        case INITIALIZATION: {
            return {
                ...state,
                initialized: true
            }
        }
        default: return state
    }
}
const initialization = () => ({ type: INITIALIZATION })

export const initializationTC = () =>
    (dispatch) => {
        let promise = dispatch(getUserAuthDataTC())
        promise.then(() => {
            dispatch(initialization())
        })
    }


export default appReducer