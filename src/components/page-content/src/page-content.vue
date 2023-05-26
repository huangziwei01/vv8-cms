<template>
  <div class="page-content">
    <my-table
      v-bind="contentTableConfig"
      :tableData="tableData"
      @selection-change="test"
    >
      <template #title>
        <h3>{{ contentTableConfig.title }}</h3>
      </template>

      <template #headerHandler>
        <el-button type="success" v-if="isCreate" plain @click="newBtnClick">{{
          contentTableConfig.newBtnTitle
            ? contentTableConfig.newBtnTitle
            : '新建'
        }}</el-button>
        <el-button type="primary" icon="RefreshLeft">刷新</el-button>
      </template>
      <template #create="scoped">
        <span>{{ filters.formatUtcTime(scoped.row.createAt) }}</span>
      </template>
      <template #update="scoped">
        <span>{{ filters.formatUtcTime(scoped.row.createAt) }}</span>
      </template>
      <template #handler="scoped">
        <span>
          <div class="btns">
            <el-button
              type="primary"
              plain
              icon="Edit"
              v-if="isUpdate"
              @click="editBtnClick(scoped.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              plain
              icon="Delete"
              v-if="isDelete"
              @click="handleDeleteClick(scoped.row)"
              >删除</el-button
            >
          </div>
        </span>
      </template>
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>

      <template #footer>
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30]"
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </template>
    </my-table>
  </div>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useSystemStore } from '@/store/system/system'
import MyTable from '@/base-ui/table'
import { usePermission } from '@/hooks/use-permission'
import { deletePageDataById } from '@/api/system/system'

import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'

const props = defineProps({
  contentTableConfig: {
    type: Object,
    default: () => {}
  },
  pageName: {
    type: String,
    default: ''
  }
})

const currentPage = ref(1)
const pageSize = ref(10)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)

// globalProperties的用法
const demo = getCurrentInstance()
const filters = demo?.appContext.config.globalProperties.$filters

const otherPropSlots = computed(() => {
  return props.contentTableConfig?.propList.filter((item: any) => {
    if (item.slotName === 'create') return false
    else if (item.slotName === 'handler') return false
    else if (item.slotName === 'update') return false
    return true
  })
})

const isCreate = usePermission(props.pageName, 'create')
const isDelete = usePermission(props.pageName, 'delete')
const isUpdate = usePermission(props.pageName, 'update')
const isQuery = usePermission(props.pageName, 'query')

const test = (payload: any) => {
  console.log(payload)
}

const systemStore = useSystemStore()

const getPageData = () => {
  const queryInfo = systemStore.queryInfo
  if (isQuery) {
    systemStore.getPageDataList(props.pageName, {
      offset: Number(currentPage.value - 1) * pageSize.value,
      size: pageSize.value,
      ...queryInfo
    })
  }
}
//< script setup >模式子组件必须使用 defineExpose 暴露出你需要让外部访问的方法或参数
defineExpose({
  getPageData
})

getPageData()

const tableData = computed(() => {
  switch (props.pageName) {
    case 'users':
      return systemStore.usersPageListData.list
    case 'role':
      return systemStore.rolePageListData.list
    case 'menu':
      return systemStore.menuPageListData.list
    case 'goods':
      return systemStore.goodsPageListData.list
    case 'categary':
      return systemStore.categaryPageListData.list
    case 'department':
      return systemStore.departmentPageListData.list
  }
})

const tableCount = computed(() => {
  switch (props.pageName) {
    case 'users':
      return Number(systemStore.usersPageListData.totalCount)
    case 'role':
      return Number(systemStore.rolePageListData.totalCount)
    case 'menu':
      return Number(systemStore.menuPageListData.totalCount)
    case 'goods':
      return Number(systemStore.goodsPageListData.totalCount)
    case 'categary':
      return Number(systemStore.categaryPageListData.totalCount)
    case 'department':
      return Number(systemStore.departmentPageListData.totalCount)
  }
})

const handleSizeChange = (pageSize: number) => {
  getPageData()
}
const handleCurrentChange = (currentPage: number) => {
  getPageData()
}

const deletePageData = async (item: any) => {
  let url = `/${props.pageName}/${item.id}`
  try {
    let res = await deletePageDataById(url)
    getPageData()
    ElNotification({
      title: '提示',
      message: '删除成功',
      type: 'success'
    })
  } catch (error: any) {
    ElNotification({
      title: '提示',
      message: error.msg,
      type: 'error'
    })
  }
}

const handleDeleteClick = (item: any) => {
  ElMessageBox.confirm('确定要删除吗?', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      deletePageData(item)
    })
    .catch(() => {})
}

const emit = defineEmits(['newBtnClick', 'editBtnClick'])
const newBtnClick = () => {
  emit('newBtnClick')
}
const editBtnClick = (row: any) => {
  emit('editBtnClick', row)
}
</script>

<style scoped lang="less">
.page-content {
  padding: 40px 20px;
  .btns {
    display: flex;
  }
}
</style>
