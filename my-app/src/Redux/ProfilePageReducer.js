let ADD_POST = 'ADD-POST'
let UPDATE_NEW_POST = 'UPDATE-NEW-POST'

let initialState = {
    datapost: [{ id: 1, post: "я выучу реакт", likes: 15 },
               { id: 2, post: "привет", likes: 12 }],
    newPost: '',
}
let copy = {...initialState}
copy.datapost = [{...initialState.datapost}]
window.copy = copy
function profilePageReducer(state = initialState, action) {
    debugger
    switch (action.type) {
        case ADD_POST: {
            let stateCopy = {...state}
            stateCopy.datapost = [...state.datapost]
            stateCopy.datapost.push({ id: 3, post: state.newPost, likes: 0 })
            stateCopy.newPost = ''
            return stateCopy
        }
        case UPDATE_NEW_POST: {
            let stateCopy = {...state}
            stateCopy.newPost = action.post
            return stateCopy
        }
        default: return state
    }
}

export const addPostCreator = () => ({ type: ADD_POST })
export const updateNewPostCreator = (post) => ({ type: UPDATE_NEW_POST, post: post })

export default profilePageReducer