import React from "react"
import style from "./FormsControl.module.css"

export const Textarea = ({ input, meta, ...props }) => {
    const hasError = meta.touched && meta.error
    return (
        <div className={style.form + ' ' + (hasError && style.error)}>
            <div>  <textarea {...input} {...props} /> </div>
            <div className={style.error}>
                {hasError && <span> {meta.error}</span>} </div>
        </div>
    )
}

export const Input = ({ input, meta, ...props }) => {
    const hasError = meta.touched && meta.error
    return (
        <div className={style.form + ' ' + (hasError && style.error)}>
            <div>  <input {...input} {...props} /> </div>
            <div className={style.error}>
                {hasError && <span> {meta.error}</span>} </div>
        </div>
    )
}