import { ref } from 'vue'
import PageModal from '@/components/page-modal'
// import PageContent from '@/components/page-content'

type CallbackFn = (item?: any) => void

export function usePageModal(
  pageContentRef: any,
  pageModalRef: any,
  newHandleCallback?: CallbackFn,
  editHandleCallback?: CallbackFn
) {
  const defaultInfo = ref({})

  const handleNewBtnClick = () => {
    defaultInfo.value = {}
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
    newHandleCallback && newHandleCallback()
  }

  const handleEditBtnClick = (row: any) => {
    defaultInfo.value = { ...row }
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
    editHandleCallback && editHandleCallback(row)
  }

  const afterEditUpdate = () => {
    pageContentRef.value.getPageData()
  }

  const afterCreateUpdate = () => {
    pageContentRef.value.getPageData()
  }

  return {
    pageModalRef,
    defaultInfo,
    handleNewBtnClick,
    handleEditBtnClick,
    afterCreateUpdate,
    afterEditUpdate
  }
}
