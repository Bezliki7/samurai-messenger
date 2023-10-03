import React from 'react'
import Posts from './Posts/Posts'
import s from './PostsBlock.module.css'


const PostsBlock = (props) => {
    let posts = props.datapost.map(p => <Posts id={p.id} message={p.post} likes={p.likes} />);
    let newPostElement = React.createRef();
    let addPost = () => {
        props.addPost()
    }
    let updateNewPost = () => {
        props.updateNewPost(newPostElement.current.value)
    }

    return (
        <div className={s.PostsBlock}>
            <div>
                <div><textarea onChange={updateNewPost} ref={newPostElement} value={props.post} cols="20" rows="4"></textarea></div>
                <div><button onClick={addPost}>add post</button></div>
            </div>
            {posts}
        </div>
    )
}


export default PostsBlock