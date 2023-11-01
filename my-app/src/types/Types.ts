export type PhotosType = {
    small: string | null
    large: string | null
}
export type DataPostType = {
    id: number
    post: string
    likes: number
}
export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type DescriptionType = {
    aboutMe: string
    contacts: ContactsType
    userId: number | null
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    photos: PhotosType
}
export type UsersType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
}

export type DialogsDataType = {
    id: number
    name: string
    photo: string
}

export type MessagesDataType = {
    id: number
    mess: string
}