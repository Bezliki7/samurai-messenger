import React from "react"
import styles from "./Users.module.css"
import userPhoto from "../../assets/images/user.jpg"
import { NavLink } from "react-router-dom"
import { UsersType } from "../../types/Types"

type UserProps = {
    user: UsersType
    isFollowing: Array<number>
    unfollow: (userId:number) => void
    follow: (userId:number) => void
}

function User({ user, isFollowing, unfollow, follow }:UserProps) {
    return (
        <div className={styles.users}>

            <div className={styles.photo} >
                <NavLink to={`/Profile/${user.id}`} >
                    <img src={(user.photos.large === null) ? userPhoto : user.photos.large} />
                </NavLink>
                {user.name}
            </div>
            
            {user.status}

            <div>
                {(user.followed
                    ? <button disabled={isFollowing.some(i => i === user.id)} onClick={() => {
                        unfollow(user.id)
                    }}> unfollow </button>
                    : <button disabled={isFollowing.some(i => i === user.id)} onClick={() => {
                        follow(user.id)
                    }}>  follow  </button>)}
            </div>
        </div>
    )
}
export default User
