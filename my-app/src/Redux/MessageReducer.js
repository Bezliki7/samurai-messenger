let SEND_MESSAGE = 'SEND-MESSAGE'
let UPDATE_MESSAGE = 'UPDATE-MESSAGE'

let initialState = {
    dialogsData: [{ id: 1, name: 'Rudeus', photo: 'https://foni.club/uploads/posts/2023-02/1677548706_foni-club-p-art-rudeus-greirat-13.jpg' },
    { id: 2, name: 'Silph', photo: 'https://wallpaperaccess.com/full/5659840.jpg', s:{} },
    { id: 3, name: 'Roxi', photo: 'https://image.myanimelist.net/ui/5LYzTBVoS196gvYvw3zjwNqf2pTVf7NmlarZOiVM_t4' },
    { id: 4, name: 'Eris', photo: 'https://foni.club/uploads/posts/2023-02/thumbs/1676776854_foni-club-p-oboi-reinkarnatsiya-bezrabotnogo-na-pk-15.jpg' }],
    messagesData: [{ id: 1, mess: 'Rudy' },
    { id: 2, mess: 'how a u' },],
}

function messageReducer(state = initialState, action) {
    switch (action.type) {
        case SEND_MESSAGE:
            return {
                ...state,
                messagesData: [...state.messagesData, { id: 0, mess: action.text }],
            };
        case UPDATE_MESSAGE:
            return {
                ...state,
                newMess: action.newChar
            }
        default: return state
    }
}

export const sendMessageCreator = (text) => ({ type: SEND_MESSAGE, text })
export const updateMessageCreator = (char) => ({ type: UPDATE_MESSAGE, newChar: char })

export default messageReducer