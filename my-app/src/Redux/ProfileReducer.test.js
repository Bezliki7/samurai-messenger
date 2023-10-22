import React from "react"
import profileReducer, { addPostCreator, deletePostAC } from "./ProfileReducer"

let state = {
    datapost: [
        { id: 1, post: "я выучу реакт", likes: 15 },
        { id: 2, post: "привет", likes: 12 }
    ]
}

it('post should be added', () => {
    let action = (addPostCreator('lox'))
    let newState = profileReducer(state, action)
    expect(newState.datapost.length).toBe(3)
})

it('post should be correct', () => {
    let action = (addPostCreator('lox'))
    let newState = profileReducer(state, action)
    expect(newState.datapost[2].post).toBe('lox')
})

it('post should be deleted', () => {
    let action = deletePostAC(1000)
    let newState = profileReducer(state, action)
    expect(newState.datapost.length).toBe(2)
})