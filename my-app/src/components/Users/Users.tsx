import React from "react"
import { Paginator } from "../common/paginator/paginator"
import User from "./User"
import { UsersType } from "../../types/Types"

type UsersProps = {
    totalUsers:number
    pageSize: number
    page: number

    users: Array<UsersType>
    isFollowing: Array<number>
    setPage: (page:number) => void
    unfollow: (userId:number) => void
    follow: (userId:number) => void
}

function Users({ isFollowing, unfollow, follow, ...props }: UsersProps) {
    return (
        <div>
            <Paginator itemsCount={props.totalUsers} pageSize={props.pageSize} page={props.page} setPage={props.setPage} />
            {props.users.map(u => <User user={u}
                                        isFollowing={isFollowing}
                                        unfollow={unfollow}
                                        follow={follow} />)}
        </div>
    )
}
export default Users
