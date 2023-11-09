import React, { useEffect } from "react"
import { Paginator } from "../common/paginator/paginator"
import User from "./User"
import { UsersType } from "../../types/Types"
import { UsersSearchFrom } from "./UsersSearchFrom"
import { useLocation, useSearchParams } from "react-router-dom"
import queryString from 'query-string';

type UsersProps = {
  totalUsers: number | undefined
  pageSize: number
  page: number
  term: string
  friend: boolean | null | undefined

  users: Array<UsersType>
  isFollowing: Array<number>
  isFetching: boolean
  setPage: (page: number) => void
  unfollow: (userId: number) => void
  follow: (userId: number) => void
  requestUsers: (page: number, pageSize: number, term?: string, friend?: boolean | null) => void
}

type SearchParams = {
  'term': any
  'friend': any
  'page': any
}

export function Users({ isFollowing, unfollow, follow, ...props }: UsersProps) {
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams(location.search)

  const setPage = (page: number) => {
    props.setPage(page)
    props.requestUsers(page, props.pageSize, props.term, props.friend)
  }

  useEffect(() => {
    setSearchParams( {'term': props.term, 'friend': props.friend, 'page': props.page} as SearchParams)    
  }, [props.term, props.friend, props.page])

  useEffect(() => {

    let actualPage:any = searchParams.get('page')
    let actualTerm:any = searchParams.get('term')
    actualPage = (actualPage ? +actualPage : props.page) 
    actualTerm = (actualTerm ? actualTerm : '')
    props.requestUsers(actualPage, props.pageSize, actualTerm)
  }, [])

  return (
    <div>
      <UsersSearchFrom requestUsers={props.requestUsers} pageSize={props.pageSize} />
      <Paginator itemsCount={props.totalUsers} pageSize={props.pageSize} page={props.page} setPage={setPage} />
      {props.users.map(u => <User user={u}
        isFollowing={isFollowing}
        unfollow={unfollow}
        follow={follow} />)}
    </div>
  )
}

export default Users



