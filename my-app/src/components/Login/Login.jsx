import React from "react"
import { Field, reduxForm } from 'redux-form'

const LoginForm = (props) => {
    return (
        <div>
            <form onSubmit={ props.handleSubmit(props.onSubmit) } >
                <div> <Field name="login" placeholder="login" component="input" /> </div>
                <div> <Field name="password" placeholder="password" component='input' /> </div>
                <div> <Field name="checkbox" type="checkbox" component="input" /> remember me </div>
                <div> <button>Login</button> </div>
            </form>
        </div>
    )
}
const ReduxLoginForm = reduxForm({form: 'login'})(LoginForm)

function Login() {
    const onSubmit = (formData) => {
        console.log(formData)
    }
    return (
        <div>
            <h1>Login</h1>
            <ReduxLoginForm onSubmit={onSubmit} />
        </div>
    )
}

export default Login