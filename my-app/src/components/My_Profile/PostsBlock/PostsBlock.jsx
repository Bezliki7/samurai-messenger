import React from 'react'
import Posts from './Posts/Posts'
import s from './PostsBlock.module.css'
import { Field, reduxForm } from 'redux-form'
import { required, maxLength } from '../../Utils/Validators/Validators'
import { Textarea } from '../../common/FormsControl/FormsControl'

const maxLength10 = maxLength(10)

const AddPostForum = (props) => {
    return (
        <form onSubmit={props.handleSubmit(props.onSubmit)} >
            <Field value={''} component={Textarea} name={'post'} validate={[required, maxLength10]} placeholder='' />
            <div><button >add post</button></div>
        </form>
    )
}

const ReduxAddPostForum = reduxForm({
    form: 'addPost'
})(AddPostForum)

const PostsBlock = (props) => {
    let posts = props.datapost.map(p => <Posts id={p.id} message={p.post} likes={p.likes} />);
    const PostText = (dataForm) => {
        props.addPost(dataForm.post)
    }

    return (
        <div className={s.PostsBlock}>
            <div>
                <ReduxAddPostForum post={props.post} onSubmit={PostText} />
            </div>
            {posts}
        </div>
    )
}

export default PostsBlock