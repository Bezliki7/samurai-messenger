import React from "react"
import styles from "./Users.module.css"

let Users = (props) => {
    if (props.users.length === 0) {
        props.setUsers([
            {
                id: 1, photoUrl: 'https://i.pinimg.com/originals/05/52/5c/05525c120abb931a6df250f2e3ab03be.jpg',
                followed: true, fullName: 'Ruslan', status: 'dada0',
            },
            {
                id: 2, photoUrl: 'https://i.pinimg.com/originals/05/52/5c/05525c120abb931a6df250f2e3ab03be.jpg',
                followed: false, fullName: 'Violet', status: 'haha',
            },
            {
                id: 3, photoUrl: 'https://i.pinimg.com/originals/05/52/5c/05525c120abb931a6df250f2e3ab03be.jpg',
                followed: true, fullName: 'fn', status: 'mm',
            }
        ])
    }

    return (
        <div>
            {props.users.map(u => {
                return (
                    <div className={styles.users}>
                        <div className={styles.photo} >
                            <img src={u.photoUrl} />
                            {u.fullName}
                        </div>
                        <div>
                            {u.followed
                                ? <button onClick={() => { props.unfollow(u.id) }}>unfollow</button>
                                : <button onClick={() => { props.follow(u.id) }}>follow</button>}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Users