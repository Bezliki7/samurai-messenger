import React from "react"
import { Formik, Form, Field } from "formik"

export const UsersSearchFrom = (props: SearchFromProps) => {
  const onSubmit = (values: FilterType, { setSubmitting }: any) => {
    const value = values.friend;
    const friend = value == 'followed' ? true : value == 'unfollowed' ? false : null;
    props.requestUsers(1, props.pageSize, values.term, friend);
    setSubmitting(false);
  };
  return (
    <div>
      <Formik
        initialValues={{ term: '', friend: 'all' }}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type='text' name='term' />
            <Field as='select' name='friend'>
              <option value='all'>all</option>
              <option value='followed'>followed</option>
              <option value='unfollowed'>unfollowed</option>
            </Field>
            <button type="submit" disabled={isSubmitting}>
              Find
            </button>
          </Form>
        )}
      </Formik>
    </div>)
}


export type SearchFromProps = {
  requestUsers: (page: number, pageSize: number, term?: string, friend?: boolean | null) => void
  pageSize: number
}
export type FilterType = {
  term: string
  friend: 'all' | 'followed' | 'unfollowed' | boolean
}

