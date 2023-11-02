import React, {memo} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../../Redux/ProfileReducer'
import PostsBlock from './PostsBlock';
import { AppStateType } from '../../../Redux/redux-store';

const PostsBlockContainer = memo(() => {
    const dispatch = useDispatch()
    const post = useSelector((state:AppStateType) => state.profilePage.newPost)
    const datapost = useSelector((state:AppStateType) => state.profilePage.datapost)
    const photos = useSelector((state:AppStateType) => state.profilePage.description.photos)

    let addPost = (post:string) => {
        let action = actions.addPostCreator(post)
        dispatch(action);
    }

    return ( <PostsBlock addPost={addPost} post={post} datapost ={datapost} photos={photos} />)
})

export default PostsBlockContainer