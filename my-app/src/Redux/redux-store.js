import {configureStore } from '@reduxjs/toolkit'
import usersReducer from './UsersReducer'
import profileReducer from './ProfileReducer'
import messageReducer from './MessageReducer'


let store = configureStore({
    reducer: {
        profilePage: profileReducer,
        messagePage: messageReducer,
        usersPage: usersReducer,
    }
})


export default store