import React from 'react';
import Message from './Message/Message';
import s from './Messages.module.css';
import Dialog from './Dialog/Dialog';

const Messages = (props) => {
    let dialogs = props.dialogsData.map(el => <Dialog id={el.id} name={el.name} photo={el.photo} />);
    let messageItem = props.messagesData.map(el => <Message id={el.id} mess={el.mess} />);

    let messageElement = React.createRef()
    let sendMessage = () => {
        props.sendMessage()
    };
    let updateMessage = () => {
        props.updateMessage(messageElement.current.value)
    }
    return (
        <div className={s.Messages}>
            <div className={s.dialogs}> {dialogs} </div>
            <div className={s.messageItems}>
                <div>{messageItem}</div>
                <div> <textarea onChange={updateMessage} ref={messageElement} value={props.newMess} cols="20" rows="3"></textarea> </div>
                <div > <button onClick={sendMessage} >send</button> </div>
            </div>
        </div>)
}

export default Messages