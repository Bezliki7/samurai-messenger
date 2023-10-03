import Discription from './Discription/Discription'
import s from './My_Profile.module.css'
import PostsBlockContainer from './PostsBlock/PostsBlockContainer'



const MyProfile = () => {
    return (
        <div className={s.MyProfile}>
            <Discription />
            <PostsBlockContainer />
        </div>)
}


export default MyProfile