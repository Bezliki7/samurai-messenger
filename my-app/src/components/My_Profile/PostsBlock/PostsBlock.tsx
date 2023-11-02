import React from 'react'
import Posts from './Posts/Posts'
import s from './PostsBlock.module.css'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { required, maxLength } from '../../Utils/Validators/Validators'
import { Textarea } from '../../common/FormsControl/FormsControl'
import { DataPostType, PhotosType } from '../../../types/Types'

type PostsBlockProps = {
    datapost: Array<DataPostType>
    photos: PhotosType
    post: string
    addPost: (post:string) => void
}

type FormProps = {
    post: string
}

type OwnProps = {
    onSubmit: (dataForm:FormProps) => void
}
const maxLength10 = maxLength(10)

const AddPostForum:React.FC<OwnProps & InjectedFormProps<FormProps, OwnProps>> = ({handleSubmit, onSubmit}) => {
    return (
        <form onSubmit={handleSubmit(onSubmit)} >
            <Field component={Textarea} name={'post'} validate={[required, maxLength10]} placeholder='' />
            <div><button >add post</button></div>
        </form>
    )
}

const ReduxAddPostForum = reduxForm<FormProps, OwnProps>({form: 'addPost'})(AddPostForum)

function PostsBlock ({datapost, photos, ...props}:PostsBlockProps) {
    let posts = datapost.map(p => <Posts key={p.id} id={p.id} message={p.post} likes={p.likes} photos={photos} />);
    const onSubmit = (dataForm: FormProps) => {
        props.addPost(dataForm.post)
    }

    return (
        <div className={s.PostsBlock}>
            <div>
                <ReduxAddPostForum  onSubmit={onSubmit} />
            </div>
            {posts}
        </div>
    )
}

export default PostsBlock