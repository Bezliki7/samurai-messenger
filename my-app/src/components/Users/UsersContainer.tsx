import React from "react"
import { useSelector } from "react-redux"
import Users from "./Users"
import Preloader from "../common/preloader/Preloader"
import { followTC, getUserThunkCreator, unfollowTC, usersActions } from "../../Redux/UsersReducer"
import { getIsFetching, getIsFollowing, getPage, getPageSize, getTotalUsers, getUsers } from "../../Redux/reselectors"
import { UsersType } from "../../types/Types"
import { AppStateType } from "../../Redux/redux-store"
import { useAppDispatch } from "../../Hooks/hooks"
// import { WithAuthRedirect } from "../HOC/WithAuth"


type UsersApiComponent = {
    page: number
    pageSize: number
    totalUsers:number
    isFetching: boolean

    users: Array<UsersType>
    isFollowing: Array<number>
    requestUsers: (page:number, pageSize:number) => void
    setPage: (page:number) => void
    unfollow: (userId:number) => void
    follow: (userId:number) => void
}

let UsersContainer = () => {
    // const dispatch = useDispatch()
    const dispatch = useAppDispatch()
    const users = useSelector((state:AppStateType) => getUsers(state))
    const page = useSelector((state:AppStateType) => getPage(state))
    const totalUsers = useSelector((state:AppStateType) => getTotalUsers(state))
    const pageSize = useSelector((state:AppStateType) => getPageSize(state));
    const isFollowing = useSelector((state:AppStateType) => getIsFollowing(state))
    const isFetching = useSelector((state:AppStateType) => getIsFetching(state))

    let setPage = (page:number) => {
        dispatch(usersActions.setPageAC(page))
    }
    let requestUsers = (page:number,pageSize:number) => {
        dispatch(getUserThunkCreator(page,pageSize))
    }
    let unfollow = (id:number) => {
        dispatch(unfollowTC(id))
    }
    let follow = (id:number) => {
        dispatch(followTC(id))
    }
    return (<UsersAPI users={users} follow={follow} unfollow={unfollow} requestUsers={requestUsers} isFetching={isFetching}
            page={page} setPage={setPage} totalUsers={totalUsers} pageSize={pageSize} isFollowing={isFollowing} /> 
    )
}

class UsersAPI extends React.Component<UsersApiComponent> {
    componentDidMount() {
        this.props.requestUsers(this.props.page, this.props.pageSize)
    }
    setPage = (page:number) => {
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