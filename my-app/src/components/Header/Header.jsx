import { NavLink } from 'react-router-dom'
import s from './Header.module.css'

const Header = (props) => {
    return (
        <div className={s.header}>
            App
            <div className={s.loginBlock}>
                <NavLink to="/login" >
                    {props.isAuth ? props.uLogin : 'login'}
                </NavLink>
            </div>
        </div>)
}

export default Header