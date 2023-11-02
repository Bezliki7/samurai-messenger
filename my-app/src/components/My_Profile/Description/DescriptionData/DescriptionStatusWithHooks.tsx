import React,  { useState, useEffect } from "react";

type DescriptionStatus = {
    status: string
    updateStatus: (status:string) => void
} 

const DescriptionStatus = (props:DescriptionStatus) => {
    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    useEffect( () => {
        setStatus(props.status)
    }, [props.status] )

    const activeEditMide = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }
    const changeStatus = (event:any) => {
       setStatus(event.currentTarget.value)
    }

    return (
        <>
            {(editMode)
                ? <div> <input onChange={changeStatus} autoFocus={true}
                    onBlur={deactivateEditMode} value={status} /> </div>
                : <div onDoubleClick={activeEditMide} > {props.status || 'no status'} </div>}

        </>
    )
}

export default DescriptionStatus