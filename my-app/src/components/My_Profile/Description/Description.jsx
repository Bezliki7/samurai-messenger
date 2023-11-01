import Preloader from '../../common/preloader/Preloader'
import s from './Description.module.css'
import DescriptionDataForm from './DescriptionData/DescriptionDataForm'
import DescriptionStatus from './DescriptionData/DescriptionStatusWithHooks'
import DescriptionData from './DescriptionData/DescriptionData'

const Description = ({description, ...props}) => {
    if (!description.photos) {
        return <Preloader />
    }
    const getPhoto = (e) => {
        if (e.target.files) {
            props.changePhoto(e.target.files[0])
        }
    }

    return (
        <div className={s.Disc}>
            Profile
            <div>
                <img src={ description.photos.large
                    ? description.photos.large
                    : 'https://i.pinimg.com/originals/05/52/5c/05525c120abb931a6df250f2e3ab03be.jpg'} />

                {props.isOwner &&
                    <div className={s.changePhoto}>
                        <input type='file' onChange={getPhoto} />
                        <label><button>Edit photo</button></label>
                    </div>}
            </div>
                    
            {description.fullName}
            
            <DescriptionStatus status={props.status} updateStatus={props.updateStatus} />

            {props.editMode
                ? <DescriptionDataForm {...props} description={description} initialValues={description.contacts} />
                : <DescriptionData description={description} setEditMode={props.setEditMode} isOwner={props.isOwner} />}
        </div>
    )
}

export default Description