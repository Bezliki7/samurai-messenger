import { getUserAuthDataTC } from "./AuthReducer"

let INITIALIZATION = 'app/INITIALIZATION'

type InitialStateType = typeof initialState

let initialState = {
    initialized: false,
}

function appReducer(state = initialState, action: ActionType): InitialStateType  {
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

type ActionType = {
    type: typeof INITIALIZATION
}
const initialization = (): ActionType => ({ type: INITIALIZATION })


export const initializationTC = () =>
    (dispatch: any) => {
        let promise = dispatch(getUserAuthDataTC())
        promise.then(() => {
            dispatch(initialization())
        })
    }


export default appReducer