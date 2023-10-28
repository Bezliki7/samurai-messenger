import React from "react"
import s from "../common/FormsControl/FormsControl.module.css"
import { Field, reduxForm } from 'redux-form'
import { Input } from "../common/FormsControl/FormsControl"
import { required } from "../Utils/Validators/Validators"
import { useDispatch, useSelector } from "react-redux"
import { loginTC } from "../../Redux/AuthReducer.ts"
import { Navigate } from "react-router-dom"

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit(props.onSubmit)} >

            <div> <Field name="email" placeholder="login" component={Input} validate={[required]} /> </div>
            <div> <Field name="password" placeholder="password" component={Input} validate={[required]} /> </div>
            <div> <Field name="rememberMe" type="checkbox" component="input" /> remember me </div>
            {(props.error) && <div className={s.err} > {props.error} </div>}
            {props.captcha &&
                <div>
                    <div><img src={props.captcha} /></div>
                    <Field component={Input} name="captcha" />
                </div>}
            <div> <button>Login</button> </div>
        </form>
    )
}
const ReduxLoginForm = reduxForm({ form: 'login' })(LoginForm)

function Login() {
    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.auth.isAuth)
    const captcha = useSelector(state => state.auth.captcha)

    const login = (email, password, rememberMe, captcha) => {
        dispatch(loginTC(email, password, rememberMe, captcha))
    }
    const onSubmit = ( formData ) => {
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