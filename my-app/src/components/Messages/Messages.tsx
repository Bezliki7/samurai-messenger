import React from 'react';
import Message from './Message/Message';
import s from './Messages.module.css';
import Dialog from './Dialog/Dialog';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { required, maxLength } from '../Utils/Validators/Validators';
import { Textarea, createField } from '../common/FormsControl/FormsControl';
import { DialogsDataType, MessagesDataType } from '../../types/Types';

type MessagesType = {
    dialogsData: Array<DialogsDataType>
    messagesData: Array<MessagesDataType>
    sendMessage: (text:string) => void
    updateMessage: (text:Array<string>) => void
}
type FormProps = {
    text: string
}
type OwnProps = {
    onSubmit: (formData: any) => void
}
type KeysFormProps = keyof FormProps


const Messages = (props:MessagesType) => {
    let dialogs = props.dialogsData.map(el => <Dialog id={el.id} name={el.name} photo={el.photo} />);
    let messageItem = props.messagesData.map(el => <Message id={el.id} mess={el.mess} />);

    const MessageText = (formData:FormProps) => {
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

const MessageForm:React.FC<InjectedFormProps<FormProps,OwnProps> & OwnProps  > = ({handleSubmit, onSubmit}) => {
    return (
        <form onSubmit={handleSubmit(onSubmit)} >
            {createField<KeysFormProps>('text', undefined, Textarea, [required, maxLength20])}
            <div > <button >send</button> </div>
        </form>
    )
}

const ReduxMessageForm = reduxForm<FormProps, OwnProps>({form: 'message'})(MessageForm)

export default Messages