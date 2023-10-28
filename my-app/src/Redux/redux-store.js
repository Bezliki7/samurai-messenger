import {configureStore, applyMiddleware  } from '@reduxjs/toolkit'
import usersReducer from './UsersReducer'
import profileReducer from './ProfileReducer'
import messageReducer from './MessageReducer'
import authReducer from './AuthReducer.ts'
import thunkMiddleware from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import appReducer from './AppReducer.ts'


let store = configureStore({
    reducer: {
        profilePage: profileReducer,
        messagePage: messageReducer,
        usersPage: usersReducer,
        auth: authReducer,
        form: formReducer,
        app: appReducer
    }
}, applyMiddleware(thunkMiddleware))

window.store = store


export default store