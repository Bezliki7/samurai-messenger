import messagePageReducer from "./MessagePageReducer"
import profilePageReducer from "./ProfilePageReducer"

let Store = {
    _State: {
        profilePage: {
            datapost: [{ id: 1, post: "я выучу реакт", likes: 15 },
            { id: 2, post: "привет", likes: 12 }],
            newPost: [""],
        },
        messagePage: {
            usersData: [{ id: 1, name: 'Rudeus', photo: 'https://foni.club/uploads/posts/2023-02/1677548706_foni-club-p-art-rudeus-greirat-13.jpg' },
            { id: 2, name: 'Silph', photo: 'https://wallpaperaccess.com/full/5659840.jpg' },
            { id: 3, name: 'Roxi', photo: 'https://image.myanimelist.net/ui/5LYzTBVoS196gvYvw3zjwNqf2pTVf7NmlarZOiVM_t4' },
            { id: 4, name: 'Eris', photo: 'https://foni.club/uploads/posts/2023-02/thumbs/1676776854_foni-club-p-oboi-reinkarnatsiya-bezrabotnogo-na-pk-15.jpg' }],
            messagesData: [{ id: 1, mess: 'Rudy' },
            { id: 2, mess: 'how a u' },],
            newMess: [""]
        }
    },
    getState() {
        return this._State
    },
    _callSubcriber() { },
    subcriber(observer) {
        this._callSubcriber = observer
    },

    // dispatch(action) {
    //     this._State.profilePage = profilePageReducer(this._State.profilePage, action)
    //     this._State.messagePage = messagePageReducer(this._State.messagePage, action)
    //     this._callSubcriber(this._State)
    // },
}

export default Store