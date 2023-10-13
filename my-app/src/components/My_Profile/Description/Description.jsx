import Preloader from '../../common/preloader/Preloader'
import s from './Description.module.css'
import DescriptionStatus from './DescriptionStatus'


const Description = (props) => {
    if (!props.description.photos) {
        return <Preloader />
    }
    return (
        <div className={s.Disc}>
            Profile
            <div> <img src={ (props.description.photos.small) ? props.description.photos.small : 'https://i.pinimg.com/originals/05/52/5c/05525c120abb931a6df250f2e3ab03be.jpg'}/> </div>
            <div>{props.description.fullName}</div>
            <div>{props.description.aboutMe}</div>
            <DescriptionStatus status={props.status} updateStatus={props.updateStatus} />
        </div>
    )
}

export default Description