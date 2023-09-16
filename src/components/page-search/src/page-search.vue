<template>
  <div class="page-search">
    <my-form v-model="formData" v-bind="searchFormConfig">
      <template #header>
        <div class="title">
          <h2></h2>
        </div>
      </template>
      <template #footer>
        <div class="buttons">
          <el-button icon="RefreshRight" @click="resetBtnClick">{{
            $t('reset')
          }}</el-button>
          <el-button type="primary" icon="Search" @click="SearchBtnlick">{{
            $t('search')
          }}</el-button>
        </div>
      </template>
    </my-form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue'
import MyForm from '@/base-ui/form'
import { useSystemStore } from '@/store/system/system'
const props = defineProps({
  searchFormConfig: {
    type: Object,
    default: () => []
  }
})

const emit = defineEmits(['resetBtnClick', 'searchBtnClick'])
const originFormData: any = {}
const formItems = props.searchFormConfig.formItems
for (const formItem of formItems) {
  originFormData[`${formItem.field}`] = ''
}

const formData = ref({ ...originFormData })
const systemStore = useSystemStore()
watch(formData, (newVal) => {
  // console.log(newVal)
  systemStore.queryInfo = newVal
})

const resetBtnClick = () => {
  formData.value = originFormData
  systemStore.queryInfo = {}
  emit('resetBtnClick')
}

const SearchBtnlick = () => {
  emit('searchBtnClick')
}

onUnmounted(() => {
  systemStore.queryInfo = {}
})
</script>

<style scoped lang="less">
.page-search {
  background-color: #fff;
  padding: 10px;

  .buttons {
    text-align: right;
  }

  .title {
    padding-left: 30px;
  }
}
</style>
