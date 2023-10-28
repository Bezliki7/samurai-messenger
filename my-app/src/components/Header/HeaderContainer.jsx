import Header from './Header'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserAuthDataTC, logoutTC } from '../../Redux/AuthReducer.ts'


class HeaderClass extends React.Component {
    componentDidMount() {
        this.props.getUserAuthData()
    }
    render() {
        return (<Header {...this.props} />)
    }
}

function HeaderContainer() {
    const dispatch = useDispatch()
    let uLogin = useSelector(state => state.auth.login)
    let isAuth = useSelector(state => state.auth.isAuth)
    
    const logout = () => {
        dispatch(logoutTC())
    }
    const getUserAuthData = () => {
        dispatch(getUserAuthDataTC())
    }

    return (<HeaderClass getUserAuthData={getUserAuthData} uLogin={uLogin} isAuth={isAuth} logout={logout} />)
}

export default HeaderContainer