<template>
  <div class="department">
    <page-search
      :searchFormConfig="searchFormConfig"
      @searchBtnClick="handleSearchClick"
      @resetBtnClick="handleResetClick"
    ></page-search>
    <page-content
      page-name="department"
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      @newBtnClick="handleNewBtnClick"
      @editBtnClick="handleEditBtnClick"
    >
    </page-content>
    <page-modal
      pageName="department"
      ref="pageModalRef"
      :modalConfig="modalConfigRef"
      :defaultInfo="defaultInfo"
      @after-create-update="afterCreateUpdate"
      @after-edit-update="afterEditUpdate"
    ></page-modal>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, nextTick } from 'vue'
import pageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'

import { useSystemStore } from '@/store/system/system'
import { storeToRefs } from 'pinia'

const pageContentRef = ref<InstanceType<typeof PageContent>>()
const pageModalRef = ref<InstanceType<typeof PageModal>>()

const { handleResetClick, handleSearchClick } = usePageSearch(pageContentRef)
const {
  defaultInfo,
  handleNewBtnClick,
  handleEditBtnClick,
  afterCreateUpdate,
  afterEditUpdate
} = usePageModal(pageContentRef, pageModalRef)

const systemStore = useSystemStore()
systemStore.getSelectData('department')
const { departmentSelectData } = storeToRefs(systemStore)

const modalConfigRef = computed(() => {
  const departmentItem = modalConfig.formItems!.find((item) => {
    return item.field == 'parentId'
  })

  departmentItem!.options = departmentSelectData.value.list?.map(
    (item: any) => {
      return { label: item.name, value: item.id }
    }
  )

  return modalConfig
})
</script>

<style scoped></style>
