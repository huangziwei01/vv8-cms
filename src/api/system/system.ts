import MYRequest from '@/service'

//创建页面数据
export const createPageDataRequest = (url: string, queryInfo: any) => {
  return MYRequest.post({
    url,
    data: queryInfo
  })
}
// 编辑页面数据
export const editPageDataRequest = (url: string, queryInfo: any) => {
  return MYRequest.patch({
    url,
    data: queryInfo
  })
}
//查询页面数据
export const pageListDataRequest = (url: string, queryInfo: any) => {
  return MYRequest.post({ url, data: queryInfo })
}
//删除数据
export const deletePageDataById = (url: string) => {
  return MYRequest.delete({ url })
}
//获取下拉框数据
export const selectDataRequest = (url: any) => {
  return MYRequest.post({
    url,
    data: {
      offset: 0
    }
  })
}
