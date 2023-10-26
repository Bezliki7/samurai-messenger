import { useDispatch, useSelector } from "react-redux"
import Profile from "./Profile"
import React from "react"
import { useParams } from "react-router-dom"
import { ChangeProfileContactsTC, changePhotoTC, getProfileTC, getUserStatusTC, setEditModeSuccess, updateStatusTC } from "../../Redux/ProfileReducer"
import { WithAuthRedirect } from "../HOC/WithAuth"


class ProfileAPI extends React.Component {
    refreshProfile = () => {
        let userId = this.props.params.userId
        if (!userId) { userId = this.props.userAuthId }
        if (userId) {
            this.props.getProfile(userId)
            this.props.getUserStatus(userId)
        }
    }
    componentDidMount() {
        this.refreshProfile()
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.params.userId != this.props.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        let isOwner 
        if (!this.props.params.userId) {
            isOwner = this.props.userAuthId
        }
        // let ProfileWithRedirect = WithAuthRedirect(Profile)
        return (<Profile isOwner={!!isOwner} {...this.props} />)
    }
}
export const ProfileContainer = () => {
    const dispatch = useDispatch()
    const description = useSelector(state => state.profilePage.description)
    const status = useSelector(state => state.profilePage.status)
    const userAuthId = useSelector(state => state.auth.id)
    const editMode = useSelector(state => state.profilePage.editMode)

    const setEditMode = (status) => {
        dispatch(setEditModeSuccess(status))
    }
    const changeProfileInfo = (data) => {
        dispatch(ChangeProfileContactsTC(data))
    }
    const changePhoto = (photo) => {
        dispatch(changePhotoTC(photo))
    }
    const getUserStatus = (uId) => {
        dispatch(getUserStatusTC(uId))
    }
    const getProfile = (userId) => {
        dispatch(getProfileTC(userId))
    }
    const updateStatus = (status) => {
        dispatch(updateStatusTC(status))
    }
    return (<ProfileAPI getProfile={getProfile} userAuthId={userAuthId} status={status} getUserStatus={getUserStatus}
         updateStatus={updateStatus} editMode={editMode} setEditMode={setEditMode}
        description={description} changePhoto={changePhoto} changeProfileInfo={changeProfileInfo} params={useParams()} />)
}