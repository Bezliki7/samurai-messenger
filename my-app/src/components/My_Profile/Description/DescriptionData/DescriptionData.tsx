import { ContactsType, DescriptionType } from "../../../../types/Types"

const DescriptionData = (props:DescriptionDataType) => {

    return (
        <div>
            {props.isOwner && <button onClick={() => { props.setEditMode(true) }} >edit</button>}

            {(Object.keys(props.description.contacts))
                .filter(key => { if (key == 'vk' || key == 'youtube' || key == 'github') { return key } })
                .map(key => {
                    return <Contacts key={key} contactKey={key} contactValue={props.description.contacts[key as keyof ContactsType]} />
                })}
        </div>
    )
}

const Contacts = ({ contactKey, contactValue }:ContactsPropsType) => {
    return ( <div> {contactKey} : {contactValue || '-'}</div>)
}

type ContactsPropsType = {
    contactKey: string
    contactValue: React.ReactNode
}


type DescriptionDataType = {
    isOwner: boolean
    setEditMode: (EditMode:boolean) => void
    description: DescriptionType
}

export default DescriptionData