import Header from './Header'
import React from 'react'
import { getUserAuthDataTC, logoutTC } from '../../Redux/AuthReducer'
import { useAppDispatch, useAppSelector } from '../../Hooks/hooks'

type HeaderClassProps = {
    uLogin: string | null
    isAuth: boolean
    getUserAuthData: () => void
    logout: () => void
}

class HeaderClass extends React.Component<HeaderClassProps> {
    componentDidMount() {
        this.props.getUserAuthData()
    }
    render() {
        return (<Header {...this.props} />)
    }
}

function HeaderContainer() {
    const dispatch = useAppDispatch()
    let uLogin = useAppSelector((state) => state.auth.login)
    let isAuth = useAppSelector(state => state.auth.isAuth)
    
    const logout = () => {
        dispatch(logoutTC())
    }
    const getUserAuthData = () => {
        dispatch(getUserAuthDataTC())
    }

    return (<HeaderClass getUserAuthData={getUserAuthData} uLogin={uLogin} isAuth={isAuth} logout={logout} />)
}

export default HeaderContainer