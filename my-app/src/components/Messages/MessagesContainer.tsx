import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { messagesActions } from '../../Redux/MessageReducer';
import Messages from './Messages';
import { WithAuthRedirect } from '../HOC/WithAuth';
import { AppStateType } from '../../Redux/redux-store';

const MessagesContainer = () => {
    const dispatch = useDispatch()
    const dialogsData = useSelector((state: AppStateType) => state.messagePage.dialogsData)
    const messagesData = useSelector((state: AppStateType) => state.messagePage.messagesData)

    let sendMessage = (text:string) => {
        let action = messagesActions.sendMessageCreator(text)
        dispatch(action)
    };
    let updateMessage = (text:Array<string>) => {
        let action = messagesActions.updateMessageCreator(text)
        dispatch(action)
    }
    // let MessagesWithAuthRedirect = WithAuthRedirect(Messages)
    return (<Messages dialogsData={dialogsData} messagesData={messagesData}
                       sendMessage={sendMessage} updateMessage={updateMessage} />)
}

export default MessagesContainer

