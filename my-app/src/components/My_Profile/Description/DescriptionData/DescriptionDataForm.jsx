import { Field, reduxForm } from "redux-form"
import { Input } from "../../../common/FormsControl/FormsControl"
import s from "../../../common/FormsControl/FormsControl.module.css"

const DescriptionDataForm = ({ description, initialValues, isOwner, ...props }) => {

    console.log(description)
    const onSubmit = (formData) => {
        console.log(formData)
        props.changeProfileInfo(formData)
    }

    return (<div>
        <button form="contacts" >save</button>
        

        {(Object.keys(description.contacts))
            .filter(key => { if (key == 'vk' || key == 'youtube' || key == 'github') { return key } })
            .map(key => {
                return <ContactsWithForm key={key} contactKey={key} contactValue={description.contacts[key]}
                    initialValues={initialValues} isOwner={isOwner} onSubmit={onSubmit} />
            })}
    </div>
    )
}

const Contacts = ({ initialValues, contactKey, contactValue, error = [''], ...props }) => {
    return (
        <form onSubmit={props.handleSubmit} id="contacts" >
            {contactKey} : {contactValue || '-'}
            <Field name={`${contactKey}`} component={Input} placeholder={initialValues[contactValue]} />
            {(error.at(0).toLowerCase().indexOf(contactKey) >= 0) && (<div className={s.err} > {error} </div>)}
        </form>
    )
}
const ContactsWithForm = reduxForm({ form: 'contacts' })(Contacts)

export default DescriptionDataForm