<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @searchBtnClick="handleSearchClick"
      @resetBtnClick="handleResetClick"
    ></page-search>
    <page-content
      page-name="users"
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      @newBtnClick="handleNewBtnClick"
      @editBtnClick="handleEditBtnClick"
    >
      <template #status="scoped">
        <el-button :type="scoped.row.enable ? 'success' : 'danger'">{{
          scoped.row.enable ? '启用' : '禁用'
        }}</el-button>
      </template>
    </page-content>
    <page-modal
      pageName="users"
      ref="pageModalRef"
      :modalConfig="modalConfigRef"
      :defaultInfo="defaultInfo"
      @after-create-update="afterCreateUpdate"
      @after-edit-update="afterEditUpdate"
    ></page-modal>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import pageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'

import { useSystemStore } from '@/store/system/system'
import { storeToRefs } from 'pinia'

const pageContentRef = ref<InstanceType<typeof PageContent>>()
const pageModalRef = ref<InstanceType<typeof PageModal>>()

//处理密码的逻辑
const newHandleCallback = () => {
  const passwordItem = modalConfig.formItems?.find(
    (item) => item.field === 'password'
  )
  passwordItem!.isHidden = false
}
const editHandleCallback = () => {
  const passwordItem = modalConfig.formItems?.find(
    (item) => item.field === 'password'
  )
  passwordItem!.isHidden = true
}
const { handleResetClick, handleSearchClick } = usePageSearch(pageContentRef)

//动态获取下拉框
const systemStore = useSystemStore()
systemStore.getSelectData('department')
systemStore.getSelectData('role')
const { departmentSelectData, roleSelectData } = storeToRefs(systemStore)
const {
  defaultInfo,
  handleNewBtnClick,
  handleEditBtnClick,
  afterCreateUpdate,
  afterEditUpdate
} = usePageModal(
  pageContentRef,
  pageModalRef,
  newHandleCallback,
  editHandleCallback
)

const modalConfigRef = computed(() => {
  const departmentItem = modalConfig.formItems!.find((item) => {
    return item.field == 'departmentId'
  })
  const roleItem = modalConfig.formItems!.find((item) => {
    return item.field == 'roleId'
  })

  departmentItem!.options = departmentSelectData.value.list?.map(
    (item: any) => {
      return { label: item.name, value: item.id }
    }
  )

  roleItem!.options = roleSelectData.value.list?.map((item: any) => {
    return { label: item.name, value: item.id }
  })

  return modalConfig
})
</script>

<style scoped lang="less"></style>
