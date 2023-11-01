import { NavLink, Navigate } from 'react-router-dom'
import s from './Header.module.css'
import React from 'react'

type HeaderProps = {
    isAuth: boolean
    uLogin: string | null
    logout: () => void
}

const Header = (props:HeaderProps) => {
    return (
        <div className={s.header}>
            App
            <div className={s.loginBlock}>
                <NavLink to="/login" >
                    {props.isAuth ? props.uLogin : 'login'}
                    {props.isAuth && <div className={s.logout} onClick={props.logout}> logout</div>}
                </NavLink> 
            </div>
        </div>)
}
export default Header