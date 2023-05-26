<template>
  <div class="role">
    <page-search
      :searchFormConfig="searchFormConfig"
      @searchBtnClick="handleSearchClick"
      @resetBtnClick="handleResetClick"
    ></page-search>
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="role"
      ref="pageContentRef"
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
      ref="pageModalRef"
      :modalConfig="modalConfig"
      :defaultInfo="defaultInfo"
      pageName="role"
      :otherInfo="otherInfo"
      @after-create-update="afterCreateUpdate"
      @after-edit-update="afterEditUpdate"
    >
      <el-tree
        ref="elTreeRef"
        class="menu-tree"
        :check-strictly="false"
        :data="menus"
        show-checkbox
        node-key="id"
        :props="{ label: 'name', children: 'children' }"
        @check="handleMenuCheckChange"
      />
    </page-modal>
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
import { ElTree } from 'element-plus'
import getLeafKeys from '@/utils/menuMapToLeafKeys'

const pageContentRef = ref<InstanceType<typeof PageContent>>()
const pageModalRef = ref<InstanceType<typeof PageModal>>()

const { handleResetClick, handleSearchClick } = usePageSearch(pageContentRef)

const elTreeRef = ref<InstanceType<typeof ElTree>>()
const editHandleCallback = (row: any) => {
  nextTick(() => {
    const leafKeys = getLeafKeys(row.menuList)
    elTreeRef.value?.setCheckedKeys(leafKeys, false)
  })
}
const {
  defaultInfo,
  handleNewBtnClick,
  handleEditBtnClick,
  afterCreateUpdate,
  afterEditUpdate
} = usePageModal(pageContentRef, pageModalRef)

const systemStore = useSystemStore()
systemStore.getSelectData('menu')
const menus = computed(() => systemStore.menuSelectData?.list)

const otherInfo = ref<any>({})
const handleMenuCheckChange = (data1: any, data2: any) => {
  const checkedKeys = data2.checkedKeys
  const halfCheckedKeys = data2.halfCheckedKeys
  const menuList = [...checkedKeys, ...halfCheckedKeys]
  otherInfo.value = { menuList }
}
</script>

<style scoped lang="less">
.menu-tree {
  margin-left: 20px;
}
</style>
