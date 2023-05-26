import { useSystemStore } from '@/store/system/system'
import { ElNotification } from 'element-plus'
const systemStore = useSystemStore()

export function usePageSearch(pageContentRef: any) {
  const handleSearchClick = () => {
    // ElNotification({
    //   title: '提示',
    //   message: '查询成功',
    //   type: 'success'
    // })
    pageContentRef.value?.getPageData()
  }

  const handleResetClick = () => {
    pageContentRef.value?.getPageData()
  }

  return { pageContentRef, handleSearchClick, handleResetClick }
}
