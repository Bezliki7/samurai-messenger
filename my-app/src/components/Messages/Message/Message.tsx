import s from './../Messages.module.css'

type MessageProps = {
    id: number
    mess: string
}

const Message = (props:MessageProps) => {
    return (
        <div>
            <div className={s.item}>
                {props.mess}
            </div>
            
        </div>
    )
}

export default Message