<template>
  <div class="page-modal">
    <el-dialog
      :title="modalConfig.title"
      v-model="dialogVisible"
      width="30%"
      center
      destroy-on-close
    >
      <my-form v-bind="modalConfig" v-model="formData"></my-form>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleConfirmClick"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import MyForm from '@/base-ui/form/index'
import { ref, watch } from 'vue'
import { createPageDataRequest, editPageDataRequest } from '@/api/system/system'
import { useSystemStore } from '@/store/system/system'
import { ElNotification } from 'element-plus'

const formData = ref<any>({})

const props = defineProps({
  modalConfig: {
    type: Object,
    default: () => {}
  },
  defaultInfo: {
    type: Object,
    default: () => {}
  },
  pageName: {
    type: String,
    default: ''
  },
  otherInfo: {
    type: Object,
    default: () => {}
  }
})

watch(
  () => props.defaultInfo,
  (newVal) => {
    for (const item of props.modalConfig.formItems) {
      formData.value[`${item.field}`] = newVal[`${item.field}`]
    }
  }
)

const dialogVisible = ref(false)
defineExpose({
  dialogVisible
})

const systemStore = useSystemStore()
const queryInfo = systemStore.queryInfo
const emit = defineEmits(['afterCreateUpdate', 'afterEditUpdate'])

const editPageData = async () => {
  try {
    let res = await editPageDataRequest(
      `/${props.pageName}/${props.defaultInfo.id}`,
      {
        ...formData.value,
        ...props.otherInfo
      }
    )
    ElNotification({
      title: '提示',
      message: '更新成功',
      type: 'success'
    })
    emit('afterEditUpdate')
  } catch (error: any) {
    ElNotification({
      title: '提示',
      message: error.msg,
      type: 'error'
    })
  }

  // systemStore.getPageDataList(props.pageName, queryInfo)
}

const createPageData = async () => {
  try {
    let res = await createPageDataRequest(`/${props.pageName}`, {
      ...formData.value,
      ...props.otherInfo
    })
    ElNotification({
      title: '提示',
      message: '新建成功',
      type: 'success'
    })
    emit('afterCreateUpdate')
  } catch (error: any) {
    ElNotification({
      title: '提示',
      message: error.msg,
      type: 'error'
    })
  }
}

const handleConfirmClick = () => {
  if (Object.keys(props.defaultInfo).length) {
    editPageData()
  } else {
    createPageData()
  }
  dialogVisible.value = false
}
</script>

<style scoped></style>
