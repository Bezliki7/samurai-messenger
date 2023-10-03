import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessageCreator, updateMessageCreator } from '../../Redux/MessagePageReducer';
import Messages from './Messages';


const MessagesContainer = () => {
    const dispatch = useDispatch()
    const usersData = useSelector(state => state.messagePage.usersData)
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

    return (<Messages usersData={usersData} messagesData={messagesData} 
                      newMess={newMess} sendMessage={sendMessage} updateMessage={updateMessage} />)
}

export default MessagesContainer