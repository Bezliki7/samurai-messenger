import React from "react"
import styles from "./Users.module.css"
import userPhoto from "../../assets/images/user.jpg"
import { NavLink } from "react-router-dom"


function Users(props) {
    let totalPage = Math.ceil(props.totalUsers / props.pageSize)
    let pages = []
    for (let i = 1; i < totalPage + 1; i++) {
        pages.push(i)
    }
    return (
        <div>
            <div className={styles.pages}>
                {pages.map(p => {
                    return (<span className={(p === props.currentPage) ? styles.activePage : null}
                        onClick={() => props.setPage(p)}> {p} </span>)
                })}
            </div>
            {props.users.map(u => {
                return (
                    <div className={styles.users}>
                        <div className={styles.photo} >
                            <NavLink to={`/Profile/${u.id}`} >
                                <img src={(u.photos.large === null) ? userPhoto : u.photos.large} />
                            </NavLink>
                            {u.name}
                        </div>
                        {u.status}
                        <div>
                            {(u.followed
                                ? <button disabled={props.isFollowing.some(i => i === u.id)} onClick={() => {
                                    props.unfollow(u.id)
                                }}> unfollow </button>
                                : <button disabled={props.isFollowing.some(i => i === u.id)} onClick={() => {
                                    props.follow(u.id)
                                }}>  follow  </button>)}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
export default Users
