import React from "react"
import s from "../common/FormsControl/FormsControl.module.css"
import { Field, reduxForm } from 'redux-form'
import { Input } from "../common/FormsControl/FormsControl"
import { required } from "../Utils/Validators/Validators"
import { useDispatch, useSelector } from "react-redux"
import { loginTC } from "../../Redux/AuthReducer"
import { Navigate } from "react-router-dom"

const LoginForm = (props) => {
    return (
        <div>
            <form onSubmit={ props.handleSubmit(props.onSubmit) } >
                <div> <Field name="email" placeholder="login" component={Input} validate={[required]} /> </div>
                <div> <Field name="password" placeholder="password" component={Input} validate={[required]} /> </div>
                <div> <Field name="rememberMe" type="checkbox" component="input" /> remember me </div>
                <div> {props.err} </div>
                {(props.error) && <div className={s.err} > {props.error} </div>}
                <div> <button>Login</button> </div>
            </form>
        </div>
    )
}
const ReduxLoginForm = reduxForm({form: 'login'})(LoginForm)

function Login() {
    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.auth.isAuth )
    const login = (email, password, rememberMe) => {
        dispatch(loginTC(email, password, rememberMe))
    }
    const err = useSelector(state => state.auth.err)
    const onSubmit = (formData) => {
        login(formData.email, formData.password, formData.rememberMe)  
    }
    if (isAuth) {return <Navigate to={'/Profile'} />  }
    return (
        <div>
            <h1>Login</h1>
            <ReduxLoginForm onSubmit={onSubmit} err={err} />
        </div>
    )
}

export default Login