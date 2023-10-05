import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { followAC, setUsersAC, unfollowAC } from "../../Redux/UsersReducer"
import Users from "./Users"

let UsersContainer = () => {
    debugger
    const dispatch = useDispatch()
    const users = useSelector(state => state.usersPage.users)

    let follow = (uId) => {
        let action = followAC(uId)
        dispatch(action)
    }

    let unfollow = (uId) => {
        let action = unfollowAC(uId)
        dispatch(action)
    }

    let setUsers = (users) => {
        dispatch(setUsersAC(users))
    }

    return (
        <div> <Users users={users} follow={follow} unfollow={unfollow} setUsers={setUsers}/> </div>
    )
}

export default UsersContainer