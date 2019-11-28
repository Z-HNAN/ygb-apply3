import request from '@/utils/request'

import { IUser } from '../models/users'

export async function fetch({ page = 1, pageSize = 3}: { page: number, pageSize: number } ) {
  return request(`users?_page=${page}&_limit=${pageSize}`);
}

export async function remove({ id }: { id: string }) {
  return request(`users/${id}`, {
    method: 'DELETE',
  })
}

export async function update({ id, values }: {id: string, values: IUser}) {
  return request(`users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(values),
  })
}

export async function create ({ values }: {values: IUser}) {
  return request(`users`, {
    method: 'POST',
    body: JSON.stringify(values),
  })
}
