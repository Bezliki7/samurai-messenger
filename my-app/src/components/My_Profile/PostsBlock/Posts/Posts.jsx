import s from './../PostsBlock.module.css'

const Posts = (props) => {
    if (!props.photos) return undefined

    return (
        <div className={s.Post}>
            <div className={s.item}>

                {props.photos.small
                    ? <img src={props.photos.small} />  
                    : <img src="https://i.pinimg.com/originals/05/52/5c/05525c120abb931a6df250f2e3ab03be.jpg" />}

                {props.message}

                <div>
                    <span>like</span> {props.likes}
                </div>

            </div>
        </div>)
}

export default Posts