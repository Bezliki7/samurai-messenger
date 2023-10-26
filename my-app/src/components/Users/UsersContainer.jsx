import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPageAC } from "../../Redux/UsersReducer"
import Users from "./Users"
import Preloader from "../common/preloader/Preloader"
import { getUserThunkCreator, unfollowTC, followTC } from "../../Redux/UsersReducer"
import { getIsFollowing, getPage, getPageSize, getTotalUsers, getUsers } from "../../Redux/reselectors"
// import { WithAuthRedirect } from "../HOC/WithAuth"

let UsersContainer = () => {
    const dispatch = useDispatch()
    const users = useSelector(state => getUsers(state))
    const page = useSelector(state => getPage(state))
    const totalUsers = useSelector(state => getTotalUsers(state))
    const pageSize = useSelector(state => getPageSize(state));
    const isFollowing = useSelector(state => getIsFollowing(state))

    let setPage = (page) => {
        dispatch(setPageAC(page))
    }
    let requestUsers = (page,pageSize) => {
        dispatch(getUserThunkCreator(page,pageSize))
    }
    let unfollow = (id) => {
        dispatch(unfollowTC(id))
    }
    let follow = (id) => {
        dispatch(followTC(id))
    }
    return (<UsersAPI users={users} follow={follow} unfollow={unfollow} requestUsers={requestUsers} 
            page={page} setPage={setPage} totalUsers={totalUsers} pageSize={pageSize} isFollowing={isFollowing} /> 
    )
}

class UsersAPI extends React.Component {
    componentDidMount() {
        this.props.requestUsers(this.props.Page, this.props.pageSize)
    }
    setPage = (page) => {
        this.props.setPage(page)
        this.props.requestUsers(page, this.props.pageSize)
    }
    render() {
        // let UsersWithAuthRedirect = WithAuthRedirect(Users)
        return (
            <>
                {(this.props.isFetching && <Preloader/> )}
                <Users {...this.props} setPage={this.setPage}/>
            </>
        )
    }
}

export default UsersContainer