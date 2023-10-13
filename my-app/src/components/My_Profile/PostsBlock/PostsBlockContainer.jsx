import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addPostCreator, updateNewPostCreator } from '../../../Redux/ProfileReducer'
import PostsBlock from './PostsBlock';

const PostsBlockContainer = () => {
    const dispatch = useDispatch()
    const post = useSelector(state => state.profilePage.newPost)
    const datapost = useSelector(state => state.profilePage.datapost)

    let addPost = (post) => {
        let action = addPostCreator(post)
        dispatch(action);
    }
    let updateNewPost = (text) => {
        let action = updateNewPostCreator(text)
        dispatch(action)
    }

    return ( <PostsBlock addPost={addPost} post={post} datapost ={datapost} />)
}

export default PostsBlockContainer