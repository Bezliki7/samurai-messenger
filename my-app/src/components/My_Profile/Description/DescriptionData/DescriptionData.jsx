
const DescriptionData = (props) => {

    return (
        <div>
            {props.isOwner && <button onClick={() => { props.setEditMode(true) }} >edit</button>}

            {(Object.keys(props.description.contacts))
                .filter(key => { if (key == 'vk' || key == 'youtube' || key == 'github') { return key } })
                .map(key => {
                    return <Contacts key={key} contactKey={key} contactValue={props.description.contacts[key]} />
                })}
        </div>
    )
}

const Contacts = ({ contactKey, contactValue, ...props }) => {
    return (
        <form >
            {contactKey} : {contactValue || '-'}
        </form>)
}


export default DescriptionData