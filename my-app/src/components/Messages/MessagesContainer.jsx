import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessageCreator, updateMessageCreator } from '../../Redux/MessageReducer';
import Messages from './Messages';
import { WithAuthRedirect } from '../HOC/WithAuth';

const MessagesContainer = () => {
    const dispatch = useDispatch()
    const dialogsData = useSelector(state => state.messagePage.dialogsData)
    const messagesData = useSelector(state => state.messagePage.messagesData)
    const newMess = useSelector(state => state.messagePage.newMess)

    let sendMessage = () => {
        let action = sendMessageCreator()
        dispatch(action)
    };
    let updateMessage = (text) => {
        let action = updateMessageCreator(text)
        dispatch(action)
    }

    // let MessagesWithAuthRedirect = WithAuthRedirect(Messages)
    return (<Messages dialogsData={dialogsData} messagesData={messagesData}
                      newMess={newMess} sendMessage={sendMessage} updateMessage={updateMessage} />)
}

export default MessagesContainer

