import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux/es/hooks/useSelector"

export const WithAuthRedirect = (Component) => {
    let RedirectComponent = (props) =>  {
            let isAuth = useSelector(state => state.auth.isAuth)
            if (!isAuth) return <Navigate to={'/login'} />
            return <Component {...props} />
        }
        return RedirectComponent
    }