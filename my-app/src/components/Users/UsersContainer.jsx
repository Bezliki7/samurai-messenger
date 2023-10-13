import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPageAC } from "../../Redux/UsersReducer"
import Users from "./Users"
import Preloader from "../common/preloader/Preloader"
import { getUserThunkCreator, unfollowTC, followTC } from "../../Redux/UsersReducer"
// import { WithAuthRedirect } from "../HOC/WithAuth"

let UsersContainer = () => {
    const dispatch = useDispatch()
    const users = useSelector(state => state.usersPage.users)
    const currentPage = useSelector(state => state.usersPage.currentPage)
    const totalUsers = useSelector(state => state.usersPage.totalUsers)
    const pageSize = useSelector(state => state.usersPage.pageSize);
    const isFollowing = useSelector(state => state.usersPage.isFollowing)

    let setPage = (page) => {
        dispatch(setPageAC(page))
    }
    let getUsers = (currentPage,pageSize) => {
        dispatch(getUserThunkCreator(currentPage,pageSize))
    }
    let unfollow = (id) => {
        dispatch(unfollowTC(id))
    }
    let follow = (id) => {
        dispatch(followTC(id))
    }
    return (<UsersAPI users={users} follow={follow} unfollow={unfollow} getUsers={getUsers} 
            currentPage={currentPage} setPage={setPage} totalUsers={totalUsers} pageSize={pageSize} isFollowing={isFollowing} /> 
    )
}

class UsersAPI extends React.Component {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }
    setPage = (page) => {
        this.props.setPage(page)
        this.props.getUsers(page, this.props.pageSize)
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