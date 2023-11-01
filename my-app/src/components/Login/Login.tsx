import React from "react"
import s from "../common/FormsControl/FormsControl.module.css"
import { InjectedFormProps, reduxForm } from 'redux-form'
import { Input, createField } from "../common/FormsControl/FormsControl"
import { required } from "../Utils/Validators/Validators"
import { useSelector } from "react-redux"
import { loginTC } from "../../Redux/AuthReducer"
import { Navigate } from "react-router-dom"
import { AppStateType } from "../../Redux/redux-store"
import { getCaptcha, getIsAuth } from "../../Redux/reselectors"
import { useAppDispatch } from "../../Hooks/hooks"

type LoginFormProps = {
    email:string, password:string, rememberMe:boolean, captcha:string | null
}

type OwnPropsType = {
    captcha:string | null,
    onSubmit: (formData:any) => void
}

type NameFieldForLogin = Extract<keyof LoginFormProps, string>

const LoginForm: React.FC<InjectedFormProps<LoginFormProps,OwnPropsType> & OwnPropsType> = ({handleSubmit,error,onSubmit,captcha}) => {
    return (
        <form onSubmit={handleSubmit(onSubmit)} >
            {createField<NameFieldForLogin>('email','login',Input,[required])}
            {createField<NameFieldForLogin>('password','password',Input,[required])}
            {createField<NameFieldForLogin>('rememberMe', undefined ,Input, undefined,{type:'checkbox'},'remember me')}
            {(error) && <div className={s.err} > {error} </div>}
            {captcha &&
                <div>
                    <div><img src={captcha} /></div>
                    {createField<NameFieldForLogin>('captcha',undefined,Input)}
                </div>}
            <div> <button>Login</button> </div>
        </form>
    )
}
const ReduxLoginForm = reduxForm<LoginFormProps,OwnPropsType>({ form: 'login' })(LoginForm)

function Login() {
    const dispatch = useAppDispatch()
    const isAuth = useSelector((state:AppStateType) => getIsAuth(state))
    const captcha = useSelector((state:AppStateType) => getCaptcha(state))

    const login = (email:string, password:string, rememberMe:boolean, captcha:string) => {
        dispatch(loginTC(email, password, rememberMe, captcha))
    }
    const onSubmit = ( formData:any ) => {
        login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }
    if (isAuth) { return <Navigate to={'/Profile'} /> }
    return (
        <div>
            <h1>Login</h1>
            <ReduxLoginForm onSubmit={onSubmit} captcha={captcha} />
        </div>
    )
}

export default Login