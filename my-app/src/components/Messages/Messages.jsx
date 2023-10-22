import React from 'react';
import Message from './Message/Message';
import s from './Messages.module.css';
import Dialog from './Dialog/Dialog';
import { Field, reduxForm } from 'redux-form';
import { required, maxLength } from '../Utils/Validators/Validators';
import { Textarea } from '../common/FormsControl/FormsControl';


const Messages = (props) => {
    let dialogs = props.dialogsData.map(el => <Dialog id={el.id} name={el.name} photo={el.photo} />);
    let messageItem = props.messagesData.map(el => <Message id={el.id} mess={el.mess} />);

    const MessageText = (formData) => {
        props.sendMessage(formData.text)}
    return (
        <div className={s.Messages}>
            <div className={s.dialogs}> {dialogs} </div>
            <div className={s.messageItems}>
                <div>{messageItem}</div>
                <ReduxMessageForm onSubmit={MessageText} />
            </div>
        </div>)
}
const maxLength20 = maxLength(20)

const MessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} >
            <div> <Field component={Textarea} name={'text'} validate={[required, maxLength20]}/> </div>
            <div > <button >send</button> </div>
        </form>
    )
}

const ReduxMessageForm = reduxForm({
    form: 'message'
})(MessageForm)

export default Messages