import { useSelector } from "react-redux"
import Profile from "./Profile"
import React from "react"
import { useParams } from "react-router-dom"
import { ChangeProfileContactsTC, changePhotoTC, getProfileTC, getUserStatusTC, actions, updateStatusTC } from "../../Redux/ProfileReducer"
import { WithAuthRedirect } from "../HOC/WithAuth"
import { AppStateType } from "../../Redux/redux-store"
import { ContactsType, DescriptionType, PhotosType } from "../../types/Types"
import { useAppDispatch } from "../../Hooks/hooks"

type ProfileClassType = {
    userId: number | undefined | null
    userAuthId: number | null
    status: string
    editMode: boolean
    description: DescriptionType
    updateStatus: (status:string) => void
    getProfile: (userId:number) => void
    getUserStatus: (userId:number) => void
    setEditMode: (status:boolean) => void
    changePhoto: (photo: PhotosType) => void
    changeProfileInfo: (data: ContactsType) => void
}

class ProfileClass extends React.Component<ProfileClassType> {
    refreshProfile = () => {
        let userId = this.props.userId
        if (!userId) { userId = this.props.userAuthId }
        if (userId) {
            this.props.getProfile(userId)
            this.props.getUserStatus(userId)
        }
    }
    componentDidMount() {
        this.refreshProfile()
    }
    componentDidUpdate(prevProps:ProfileClassType,) {
        if (prevProps.userId != this.props.userId) {
            this.refreshProfile()
        }
    }

    render() {
        let isOwner 
        if (!this.props.userId) {
            isOwner = this.props.userAuthId
        }
        // let ProfileWithRedirect = WithAuthRedirect(Profile)
        return (<Profile isOwner={!!isOwner} {...this.props} />)
    }
}
export const ProfileContainer = () => {
    const dispatch = useAppDispatch()
    const description = useSelector((state: AppStateType) => state.profilePage.description)
    const status = useSelector((state: AppStateType) => state.profilePage.status)
    const userAuthId = useSelector((state: AppStateType) => state.auth.id)
    const editMode = useSelector((state: AppStateType) => state.profilePage.editMode)

    const userId = useParams().userId as number | undefined

    const setEditMode = (status:boolean) => {
        dispatch(actions.setEditModeSuccess(status))
    }
    const changeProfileInfo = (data: ContactsType) => {
        dispatch(ChangeProfileContactsTC(data))
    }
    const changePhoto = (photo:PhotosType) => {
        dispatch(changePhotoTC(photo))
    }
    const getUserStatus = (uId:number) => {
        dispatch(getUserStatusTC(uId))
    }
    const getProfile = (userId:number) => {
        dispatch(getProfileTC(userId))
    }
    const updateStatus = (status:string) => {
        dispatch(updateStatusTC(status))
    }
    return (<ProfileClass getProfile={getProfile} userAuthId={userAuthId} status={status} getUserStatus={getUserStatus}
         updateStatus={updateStatus} editMode={editMode} setEditMode={setEditMode}
        description={description} changePhoto={changePhoto} changeProfileInfo={changeProfileInfo} userId={userId} />)
}