import { defineStore } from 'pinia'
import { ref } from 'vue'

import { pageListDataRequest, selectDataRequest } from '@/api/system/system'

export const useSystemStore = defineStore('system', () => {
  const language = ref<string>('zh')
  const queryInfo = ref<any>({})
  const usersPageListData = ref<any>([])
  const rolePageListData = ref<any>([])
  const menuPageListData = ref<any>([])
  const departmentPageListData = ref<any>([])
  const goodsPageListData = ref<any>([])
  const categaryPageListData = ref<any>([])

  const departmentSelectData = ref<any>([])
  const roleSelectData = ref<any>([])
  const menuSelectData = ref<any>([])

  async function getPageDataList(pageName: string, queryInfo: any) {
    let pageUrl = `${pageName}/list`
    const res = await pageListDataRequest(pageUrl, queryInfo)
    switch (pageName) {
      case 'users':
        usersPageListData.value = res
        break
      case 'role':
        rolePageListData.value = res
        break
      case 'menu':
        menuPageListData.value = res
        break
      case 'goods':
        goodsPageListData.value = res
        break
      case 'categary':
        categaryPageListData.value = res
        break
      case 'department':
        departmentPageListData.value = res
        break
    }
  }

  async function getSelectData(selectName: string) {
    switch (selectName) {
      case 'department':
        let dData = await selectDataRequest('/department/list')
        departmentSelectData.value = dData
      case 'role':
        let rData = await selectDataRequest('/role/list')
        roleSelectData.value = rData
      case 'menu':
        let mData = await selectDataRequest('/menu/list')
        menuSelectData.value = mData
    }
  }

  function changeQueryInfo(formData: any) {
    // console.log('pinia')
    // queryInfo.value = formData.value
  }

  function changeLanguage(lang: string) {
    language.value = lang
  }

  return {
    language,
    queryInfo,
    usersPageListData,
    rolePageListData,
    menuPageListData,
    departmentPageListData,
    goodsPageListData,
    categaryPageListData,
    departmentSelectData,
    roleSelectData,
    menuSelectData,
    getPageDataList,
    getSelectData,
    changeQueryInfo,
    changeLanguage
  }
})
