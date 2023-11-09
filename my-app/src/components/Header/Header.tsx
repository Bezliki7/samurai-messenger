import { NavLink, Navigate } from 'react-router-dom'
import s from './Header.module.css'
import React, { useEffect } from 'react'
import { Layout, Col, Row, Menu } from 'antd';
import { useAppDispatch, useAppSelector } from '../../Hooks/hooks';
import { getUserAuthDataTC, logoutTC } from '../../Redux/AuthReducer';

const { Header } = Layout;

const HeaderPage = () => {
    const dispatch = useAppDispatch()
    let uLogin = useAppSelector((state) => state.auth.login)
    let isAuth = useAppSelector(state => state.auth.isAuth)
    const logout = () => {
        dispatch(logoutTC())
    }
    const getUserAuthData = () => {
        dispatch(getUserAuthDataTC())
    }

    useEffect(() => {
        getUserAuthData()
    }, [])
    return (
        <Header >

            <Row className={s.header}>
                <Col span={20}> Developers  </Col>
                <Col span={1}>{isAuth ? uLogin : 'login'}</Col>
                <Col span={1}>
                    <NavLink to="/login" >
                        {isAuth ? <div onClick={logout}> logout</div> : 'login'}
                    </NavLink>
                </Col>
            </Row>

        </Header>
    )
}
export default HeaderPage