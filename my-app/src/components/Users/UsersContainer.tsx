import React, { EffectCallback } from "react"
import { useSelector } from "react-redux"
import Users from "./Users"
import Preloader from "../common/preloader/Preloader"
import { followTC, getUserThunkCreator, unfollowTC, usersActions } from "../../Redux/UsersReducer"
import { getFriend, getIsFetching, getIsFollowing, getPage, getPageSize, getTerm, getTotalUsers, getUsers } from "../../Redux/reselectors"
import { UsersType } from "../../types/Types"
import { useAppDispatch } from "../../Hooks/hooks"
// import { WithAuthRedirect } from "../HOC/WithAuth"

type UsersApiComponent = {
    page: number
    pageSize: number
    totalUsers: number | undefined
    isFetching: boolean
    term: string
    friend: null | boolean | undefined

    users: Array<UsersType>
    isFollowing: Array<number>
    requestUsers: (page: number, pageSize: number, term?: string, friend?: boolean | null) => void
    setPage: (page: number) => void
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

let UsersContainer = () => {
    const dispatch = useAppDispatch()
    const users = useSelector(getUsers)
    const term = useSelector(getTerm)
    const friend = useSelector(getFriend)
    const page = useSelector(getPage)
    const totalUsers = useSelector(getTotalUsers)
    const pageSize = useSelector(getPageSize)
    const isFollowing = useSelector(getIsFollowing)
    const isFetching = useSelector(getIsFetching)

    let setPage = (page: number) => {
        dispatch(usersActions.setPageAC(page, ''))
    }
    let requestUsers = (page: number, pageSize: number, term?: string | undefined, friend?: boolean | undefined | null) => {
        dispatch(getUserThunkCreator(page, pageSize, term, friend))
    }
    let unfollow = (id: number) => {
        dispatch(unfollowTC(id))
    }
    let follow = (id: number) => {
        dispatch(followTC(id))
    }
    return (
        // let UsersWithAuthRedirect = WithAuthRedirect(Users)
        <>
            {(isFetching && <Preloader />)}
            <Users users={users} follow={follow} unfollow={unfollow} requestUsers={requestUsers} isFetching={isFetching} term={term}
                page={page} setPage={setPage} totalUsers={totalUsers} pageSize={pageSize} isFollowing={isFollowing} friend={friend} />
        </>
    )
}

export default UsersContainer