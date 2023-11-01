import { DescriptionType, ContactsType, PhotosType } from '../types/Types';
import { ResponseType, instance } from './api';


export const ProfilesAPI = {
    getProfile(userId: number | null) {
        return instance.get<DescriptionType>(`profile/` + userId)
            .then(response => { return response.data })
    },
    getUserStatus(id: number) {
        return instance.get<string>('/profile/status/' + id)
    },
    UpdateStatus(status: string) {
        return instance.put<ResponseType<DescriptionType>>('profile/status', { status: status })
            .then(response => response.data)
    },
    ChangePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append('image', photoFile)
        return instance.put<ResponseType<PhotosType>>('/profile/photo', formData, { headers: { 'Content-type': 'multipart/form-data' } })
            .then(response => response.data)
    },
    ChangeProfileInfo(media: ContactsType, info: DescriptionType) {
        return instance.put<ResponseType>('/profile',
            {
                ...info,
                contacts: { ...media },
            })
            .then(response => response.data)
    }
}
