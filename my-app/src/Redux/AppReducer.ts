import { getUserAuthDataTC } from "./AuthReducer"
import { InfernActionsType } from "./redux-store"

let initialState = {
    initialized: false,
}

function appReducer(state = initialState, action: ActionType): InitialStateType  {
    switch (action.type) {
        case "app/INITIALIZATION": {
            return {
                ...state,
                initialized: true
            }
        }
        default: return state
    }
}

const actions = {
    initialization:  () => ({ type: 'app/INITIALIZATION' }as const)
}

export const initializationTC = () =>
    (dispatch: any) => {
        let promise = dispatch(getUserAuthDataTC())
        promise.then(() => {
            dispatch(actions.initialization())
        })
    }

type InitialStateType = typeof initialState
type ActionType = InfernActionsType<typeof actions>

export default appReducer