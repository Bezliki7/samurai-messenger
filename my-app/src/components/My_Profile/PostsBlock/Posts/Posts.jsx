import s from './../PostsBlock.module.css'

const Posts = (props) => {
    return (
        <div className={s.Post}>
            <div className={s.item}>
                <img src="https://i.pinimg.com/originals/05/52/5c/05525c120abb931a6df250f2e3ab03be.jpg" />
                {props.message}
                <div>
                    <span>like</span> {props.likes}
                </div>
            </div>
        </div>)
}

export default Posts