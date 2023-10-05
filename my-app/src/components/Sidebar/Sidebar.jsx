import  s from './Sidebar.module.css'
import { NavLink } from 'react-router-dom'


const Sidebar = () => {
    return (
    <div className={s.sidebar}>
            <div className={s.item}> <NavLink to="MyProfile">Profile</NavLink> </div>
            <div className={s.item}> <NavLink to="Messages">Messages</NavLink> </div>
            <div className={s.item}> <NavLink to="News">News</NavLink> </div>
            <div className={s.item}> <NavLink to="Music">Music</NavLink> </div>
            <div className={s.item}> <NavLink to="Settings">Settings</NavLink> </div>
            <div className={s.item}> <NavLink to="Users">Find users</NavLink> </div>
    </div>)
}

export default Sidebar