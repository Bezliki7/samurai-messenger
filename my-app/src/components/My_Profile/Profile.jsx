import Description from './Description/Description'
import s from './Profile.module.css'
import PostsBlockContainer from './PostsBlock/PostsBlockContainer'

const Profile = (props) => {
    return (
        <div className={s.MyProfile}>
            <Description {...props} />
            <PostsBlockContainer />
        </div>)
}

export default Profile