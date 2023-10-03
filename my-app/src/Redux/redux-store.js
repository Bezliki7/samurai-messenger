import {configureStore } from '@reduxjs/toolkit'
import profilePageReducer from './ProfilePageReducer'
import messagePageReducer from './MessagePageReducer'



let store = configureStore({
    reducer: {
        profilePage: profilePageReducer,
        messagePage: messagePageReducer
    }
})


export default store