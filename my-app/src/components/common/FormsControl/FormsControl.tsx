import React from "react"
import style from "./FormsControl.module.css"
import { Field, WrappedFieldProps } from "redux-form"
import { FieldValidatorsType } from "../../Utils/Validators/Validators"

export const Textarea: React.FC<WrappedFieldProps> = ({ input, meta, ...props }) => {
    const hasError = meta.touched && meta.error
    return (
        <div className={style.form + ' ' + (hasError && style.error)}>
            <div>  <textarea {...input} {...props} /> </div>
            <div className={style.error}>
                {hasError && <span> {meta.error}</span>} </div>
        </div>
    )
}

export const Input: React.FC<WrappedFieldProps> = ({ input, meta, ...props }) => {
    const hasError = meta.touched && meta.error
    return (
        <div className={style.form + ' ' + (hasError && style.error)}>
            <div>  <input {...input} {...props} /> </div>
            <div className={style.error}>
                {hasError && <span> {meta.error}</span>} </div>
        </div>
    )
}

export function createField<FieldName extends string> (name: FieldName, placeholder: string | undefined,
                                                        component: React.FC<WrappedFieldProps>,
                                                        validators?: Array<FieldValidatorsType>, props = {}, text = '') {
    return (
        <>
            <Field name={name} placeholder={placeholder} component={component} validate={validators} {...props} />
            {text}
        </>
    )
}