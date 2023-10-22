export const required = (value) => {
    if (value) return undefined
    return  'required field'
}

export const maxLength = (maxLength) =>  {return (value) => {
    if (value.length>maxLength) return `max length ${maxLength}`
    return undefined
}}