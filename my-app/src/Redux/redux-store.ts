import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './UsersReducer'
import profileReducer from './ProfileReducer'
import messageReducer from './MessageReducer'
import authReducer from './AuthReducer'
import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import appReducer from './AppReducer'
import { Action, AnyAction, combineReducers } from 'redux';
import { useDispatch } from 'react-redux'

const reducers = combineReducers({
    profilePage: profileReducer,
    messagePage: messageReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
})

const store = configureStore({
    reducer: reducers,
    middleware: [thunkMiddleware]
})

type RootState = typeof reducers
export type AppStateType = ReturnType<RootState>
// export type AppDispatch = typeof store.dispatch
export type AppDispatch = ThunkDispatch<AppStateType, any, AnyAction>

type actionsType<T> = T extends {[key:string]: infer U } ? U : never 
export type InfernActionsType<T extends {[key:string]: (...args:any) => any} > = ReturnType<actionsType<T>> 

export type ThunkActionType<A extends Action> = ThunkAction<Promise<void>,AppStateType,unknown,A>


// @ts-ignore
window.store = store


export default store