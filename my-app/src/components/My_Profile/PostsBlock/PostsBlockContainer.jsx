import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addPostCreator, updateNewPostCreator } from '../../../Redux/ProfilePageReducer'
import PostsBlock from './PostsBlock';

const PostsBlockContainer = () => {
    const dispatch = useDispatch()
    const post = useSelector(state => state.profilePage.newPost)
    const datapost = useSelector(state => state.profilePage.datapost)

    let addPost = () => {
        let action = addPostCreator()
        dispatch(action);
    }
    let updateNewPost = (text) => {
        let action = updateNewPostCreator(text)
        dispatch(action)
    }

    return ( 
    <PostsBlock addPost={addPost} updateNewPost={updateNewPost} 
                post={post} datapost ={datapost} />)
}

export default PostsBlockContainer