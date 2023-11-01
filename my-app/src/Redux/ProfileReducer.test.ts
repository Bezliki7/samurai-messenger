import React from "react"
import profileReducer, { actions } from "./ProfileReducer"
import { DescriptionType } from "../types/Types"

let state = {
    datapost: [
        { id: 1, post: "я выучу реакт", likes: 15 },
        { id: 2, post: "привет", likes: 12 }
    ],
    newPost: '',
    description: {} as DescriptionType,
    status: '',
    editMode: false as boolean,
}

it('post should be added', () => {
    let action = (actions.addPostCreator('lox'))
    let newState = profileReducer(state, action)
    expect(newState.datapost.length).toBe(3)
})

it('post should be correct', () => {
    let action = (actions.addPostCreator('lox'))
    let newState = profileReducer(state, action)
    expect(newState.datapost[2].post).toBe('lox')
})

it('post should be deleted', () => {
    let action = actions.deletePostAC(1000)
    let newState = profileReducer(state, action)
    expect(newState.datapost.length).toBe(2)
})