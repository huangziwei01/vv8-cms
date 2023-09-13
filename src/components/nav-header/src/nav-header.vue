<template>
  <div class="nav-header">
    <div>
      <el-icon :size="25" v-if="isFold" @click="foldIconClick"
        ><Expand
      /></el-icon>
      <el-icon :size="25" v-else @click="foldIconClick"><Fold /></el-icon>
    </div>
    <div class="content">
      <div>
        <bread-crumb :breadCrumbs="breadCrumbs"></bread-crumb>
      </div>
      <!-- <div></div> -->
      <div class="user">
        <lang-select class="lang-select"></lang-select>
        <user-info></user-info>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import userInfo from './cpns/user-info.vue'
import breadCrumb from '@/base-ui/breadcrumb'
import { IBreadCrumb } from '@/base-ui/breadcrumb/types'
import { pathMapToBreadCrumb } from '@/utils/pathMapToBreadCrumb'
import { useUserStore } from '@/store/user/user'
import { useRoute } from 'vue-router'
import langSelect from '@/components/lang-select'

let isFold = ref(false)
const emit = defineEmits(['foldChange'])
const foldIconClick = () => {
  isFold.value = !isFold.value
  emit('foldChange', isFold.value)
}

const store = useUserStore()
const userMenu = store.userMenu
const currentRoute = useRoute()
const breadCrumbs = computed(() => {
  return pathMapToBreadCrumb(userMenu, currentRoute.path)
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;
  .el-icon {
    padding-top: 6px;
  }
  .content {
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
  }

  .user {
    // width: 300px;
    display: flex;
    justify-content: space-around;
  }

  .lang-select {
    margin-right: 20px;
  }
}
</style>
