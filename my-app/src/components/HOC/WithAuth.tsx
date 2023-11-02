import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux/es/hooks/useSelector"
import { AppStateType } from "../../Redux/redux-store"
import React from "react"

export function WithAuthRedirect<WCP>(Component: React.ComponentType<WCP>) {
    let RedirectComponent = (props:any) => {
        let isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
        if (!isAuth) return <Navigate to={'/login'} />
        return <Component  {...props  } />
    }
    return RedirectComponent
}