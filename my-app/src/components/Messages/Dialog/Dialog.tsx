import { PhotosType } from '../../../types/Types'
import s from './../Messages.module.css'
import { NavLink } from 'react-router-dom'

type DialogProps ={
    name: string
    id: number
    photo: string
}

const Dialog = (props:DialogProps) => {
    return (
        <div>
            <div className={s.user}> <NavLink to={"/Messages/" + props.id}>
                <div>
                    <img src={props.photo} />
                    {props.name}
                </div>
            </NavLink> </div>
        </div>
    )
}

export default Dialog