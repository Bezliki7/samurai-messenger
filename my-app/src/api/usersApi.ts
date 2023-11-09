import { UsersType } from '../types/Types';
import { ResponseType, instance } from './api';

export type UsersApiType = ResponseType

type getUsersType = {
    totalCount: number
    items: Array<UsersType>
    error: string | null
}

export const UsersApi = {
    getUser(page:number, pageSize:number, term:string='', friend:boolean|null = null) {
        return instance.get<getUsersType>(`users?page=${page}&count=${pageSize}&term=${term}&friend=${friend}`)
            .then(response => { return response.data })
    },
    unfollow(id:number) {
        return instance.delete(`follow/${id}`)
            .then(response => { return response.data } )as Promise<UsersApiType>
    },
    follow(id:number) {
        return instance.post<UsersApiType>(`follow/${id}`)
            .then(response => { return response.data })
    }, 
}

