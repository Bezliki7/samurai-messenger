import React from "react"
import { Paginator } from "../common/paginator/paginator"
import User from "./User"


function Users({ isFollowing, unfollow, follow, ...props }) {
    return (
        <div>
            <Paginator totalItems={props.totalUsers} pageSize={props.pageSize} page={props.page} setPage={props.setPage} />
            {props.users.map(u => <User user={u}
                                        isFollowing={isFollowing}
                                        unfollow={unfollow}
                                        follow={follow} />)}
        </div>
    )
}
export default Users
