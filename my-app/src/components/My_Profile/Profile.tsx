import Description from './Description/Description'
import s from './Profile.module.css'
import PostsBlockContainer from './PostsBlock/PostsBlockContainer'
import { ContactsType, DescriptionType, PhotosType } from '../../types/Types'

export type ProfileProps = {
    isOwner: boolean
    userAuthId: number | null
    status: string
    editMode: boolean
    description: DescriptionType
    updateStatus: (status:string) => void
    getProfile: (userId:number) => void
    getUserStatus: (userId:number) => void
    setEditMode: (status:boolean) => void
    changePhoto: (photo: PhotosType) => void
    changeProfileInfo: (formData: ContactsType) => void
}

const Profile = (props:ProfileProps) => {
    return (
        <div className={s.MyProfile}>
            <Description {...props} />
            <PostsBlockContainer />
        </div>)
}

export default Profile