import MYRequest from '@/service/index'
// import { id } from 'element-plus/es/locale'
import { IAccount } from './type'
import { ILoginResult } from './type'

export const accountLoginRequest = (data: IAccount) => {
  return MYRequest.post<ILoginResult>({
    url: '/login',
    data
  })
}

export const requestUserInfo = (id: number) => {
  return MYRequest.get({
    url: `/users/${id}`
  })
}

export const requestUserMenu = (id: number) => {
  return MYRequest.get({
    url: `/role/${id}/menu`
  })
}
