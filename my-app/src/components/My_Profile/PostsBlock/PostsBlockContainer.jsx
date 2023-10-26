import React, {memo} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addPostCreator, updateNewPostCreator } from '../../../Redux/ProfileReducer'
import PostsBlock from './PostsBlock';

const PostsBlockContainer = memo(() => {
    const dispatch = useDispatch()
    const post = useSelector(state => state.profilePage.newPost)
    const datapost = useSelector(state => state.profilePage.datapost)
    const photos = useSelector(state => state.profilePage.description.photos)

    let addPost = (post) => {
        let action = addPostCreator(post)
        dispatch(action);
    }

    return ( <PostsBlock addPost={addPost} post={post} datapost ={datapost} photos={photos} />)
})

export default PostsBlockContainer