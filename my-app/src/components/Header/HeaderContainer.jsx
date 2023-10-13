import Header from './Header'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserAuthDataTC } from '../../Redux/AuthReducer'


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
    
    let getUserAuthData = () => {
        dispatch(getUserAuthDataTC())
    }

    return (<HeaderClass getUserAuthData={getUserAuthData} uLogin={uLogin} isAuth={isAuth} />)
}

export default HeaderContainer