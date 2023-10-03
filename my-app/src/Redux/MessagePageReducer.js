let SEND_MESSAGE = 'SEND-MESSAGE'
let UPDATE_MESSAGE = 'UPDATE-MESSAGE'

let initialState = {
    usersData: [{ id: 1, name: 'Rudeus', photo: 'https://foni.club/uploads/posts/2023-02/1677548706_foni-club-p-art-rudeus-greirat-13.jpg' },
    { id: 2, name: 'Silph', photo: 'https://wallpaperaccess.com/full/5659840.jpg' },
    { id: 3, name: 'Roxi', photo: 'https://image.myanimelist.net/ui/5LYzTBVoS196gvYvw3zjwNqf2pTVf7NmlarZOiVM_t4' },
    { id: 4, name: 'Eris', photo: 'https://foni.club/uploads/posts/2023-02/thumbs/1676776854_foni-club-p-oboi-reinkarnatsiya-bezrabotnogo-na-pk-15.jpg' }],
    messagesData: [{ id: 1, mess: 'Rudy' },
    { id: 2, mess: 'how a u' },],
    newMess: [""]
}

function messagePageReducer(state = initialState, action) {
    switch (action.type) {
        case SEND_MESSAGE: {
            let stateCopy = {...state}
            stateCopy.messagesData = [...state.messagesData]
            stateCopy.messagesData.push({ id: 0, mess: state.newMess })
            stateCopy.newMess = ""
            return stateCopy
        }
        case UPDATE_MESSAGE: {
            let stateCopy = {...state}
            stateCopy.newMess = action.newChar
            return stateCopy
        }
        default: return state
    }
}

export const sendMessageCreator = () => ({ type: SEND_MESSAGE })
export const updateMessageCreator = (char) => ({ type: UPDATE_MESSAGE, newChar: char })

export default messagePageReducer