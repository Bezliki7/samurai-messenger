import s from './../Messages.module.css'

const Message = (props) => {
    return (
        <div>
            <div className={s.item}>
                {props.mess}
            </div>
            
        </div>
    )
}

export default Message