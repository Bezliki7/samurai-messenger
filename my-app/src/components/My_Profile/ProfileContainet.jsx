import { useDispatch, useSelector } from "react-redux"
import Profile from "./Profile"
import React from "react"
import { useParams } from "react-router-dom"
import { getProfileTC, getUserStatusTC, updateStatusTC } from "../../Redux/ProfileReducer"
// import { WithAuthRedirect } from "../HOC/WithAuth"

class ProfileAPI extends React.Component {
    componentDidMount() {
        let userId = this.props.params.userId
        if (!userId) { userId = 30143 }
        this.props.getProfile(userId)
        this.props.getUserStatus(userId)
    }
    
    render() {
        // let ProfileWithRedirect = WithAuthRedirect(Profile)
        return ( <Profile {...this.props}/>)
    }
}
export const ProfileContainer = () => {
    const dispatch = useDispatch()
    const description = useSelector(state => state.profilePage.description)
    const status = useSelector(state => state.profilePage.status)

    const getUserStatus = (uId) => {
        dispatch(getUserStatusTC(uId))
    }
    const getProfile = (userId) => {
        dispatch(getProfileTC(userId))
    }
    const updateStatus = (status) => {
        dispatch(updateStatusTC(status))
    }
    return (<ProfileAPI getProfile={getProfile} status={status} getUserStatus={getUserStatus} updateStatus={updateStatus}
        description={description} params={useParams()} />)
}