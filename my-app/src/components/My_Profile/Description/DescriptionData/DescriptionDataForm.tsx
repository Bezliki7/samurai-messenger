import { Field, InjectedFormProps, reduxForm } from "redux-form"
import { Input } from "../../../common/FormsControl/FormsControl"
import s from "../../../common/FormsControl/FormsControl.module.css"
import { ContactsType, DescriptionType } from "../../../../types/Types"
import React from "react"

const DescriptionDataForm = ({ description, initialValues, isOwner, ...props }: ContactsProps) => {
    const onSubmit = (formData: ContactsType) => {
        props.changeProfileInfo(formData)
    }

    return (<div>
        <button form="contacts" >save</button>

        {(Object.keys(description.contacts))
            .filter(key => { if (key == 'vk' || key == 'youtube' || key == 'github') { return key } })
            .map(key => {
                return <ContactsWithForm key={key} contactKey={key} contactValue={description.contacts[key as keyof ContactsType]}
                    initialValues={initialValues} onSubmit={onSubmit} />
            })}
    </div>
    )
}

const Contacts: React.FC<InjectedFormProps<ContactsFormProps, ContactsOwnProps> & ContactsOwnProps> =
    ({ initialValues, contactKey, contactValue, error = [''] as any, handleSubmit, onSubmit }) => {
        return (
            <form onSubmit={handleSubmit(onSubmit)} id="contacts" >
                {contactKey} : {contactValue || '-'}
                <Field name={`${contactKey}`} component={Input} placeholder={initialValues[contactValue as keyof ContactsType]} />
                {(error.at(0).toLowerCase().indexOf(contactKey) >= 0) && (<div className={s.err} > {error} </div>)}
            </form>
        )
    }
const ContactsWithForm = reduxForm<ContactsFormProps, ContactsOwnProps>({ form: 'contacts' })(Contacts)

type ContactsProps = {
    description: DescriptionType
    initialValues: ContactsType
    isOwner: boolean
    changeProfileInfo: (formData: ContactsType) => void
}
type ContactsFormProps = {
    contacts: ContactsType
}
export type ContactsOwnProps = {
    initialValues: ContactsType
    contactKey: string 
    contactValue: React.ReactNode
    onSubmit: any
}

export default DescriptionDataForm