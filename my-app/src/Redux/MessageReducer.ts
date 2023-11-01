import { DialogsDataType, MessagesDataType } from "../types/Types"
import { InfernActionsType } from "./redux-store"

let initialState = {
    dialogsData: [
        { id: 1, name: 'Rudeus', photo: 'https://foni.club/uploads/posts/2023-02/1677548706_foni-club-p-art-rudeus-greirat-13.jpg' },
        { id: 2, name: 'Eris', photo: 'https://foni.club/uploads/posts/2023-02/thumbs/1676776854_foni-club-p-oboi-reinkarnatsiya-bezrabotnogo-na-pk-15.jpg' },
        { id: 3, name: 'Roxi', photo: 'https://image.myanimelist.net/ui/5LYzTBVoS196gvYvw3zjwNqf2pTVf7NmlarZOiVM_t4' },
        { id: 4, name: 'Silph', photo: 'https://wallpaperaccess.com/full/5659840.jpg' }] as Array<DialogsDataType>,
    messagesData: [
        { id: 1, mess: 'Rudy' },
        { id: 2, mess: 'how a u' },] as Array<MessagesDataType>,
    newMess: '' as Array<string> | string
}

function messageReducer(state = initialState, action: ActionsType): InitialStateType {
    switch (action.type) {
        case "SEND_MESSAGE":
            return {
                ...state,
                messagesData: [...state.messagesData, { id: 0, mess: action.text }],
            };
        case "UPDATE_MESSAGE":
            return {
                ...state,
                newMess: action.newChar
            }
        default: return state
    }
}

export const messagesActions = {
    sendMessageCreator: (text: string) => ({ type: 'SEND_MESSAGE', text } as const ),
    updateMessageCreator: (char: Array<string>) => ({ type: 'UPDATE_MESSAGE', newChar: char } as const )
}

type InitialStateType = typeof initialState
type ActionsType = InfernActionsType<typeof messagesActions>

export default messageReducer