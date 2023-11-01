
export type FieldValidatorsType = (value:string) => undefined | string


export const required:FieldValidatorsType = (value) => {
    if (value) return undefined
    return  'required field'
}


export const maxLength = (maxLength:number):FieldValidatorsType =>   {return (value) => {
    if (value.length>maxLength) return `max length ${maxLength}`
    return undefined
}}