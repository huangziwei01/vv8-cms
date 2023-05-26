<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar :size="35" :src="circleUrl" class="avatar" />
        {{ userName }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item icon="User">用户信息</el-dropdown-item>
          <el-dropdown-item icon="Setting">系统管理</el-dropdown-item>
          <el-dropdown-item icon="Close" divided @click="handleExitClick"
            >退出登录</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { ArrowDown } from '@element-plus/icons-vue'
import { useUserStore } from '@/store/user/user'
import localStorge from '@/utils/cache'
import router from '@/router'
const store = useUserStore()
const userName = store.userInfo.name
const circleUrl =
  'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'

const handleExitClick = () => {
  localStorge.deleteCache('token')
  router.push('/main')
}
</script>

<style scoped lang="less">
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}

.user-info {
  .el-dropdown-link {
    display: flex;
    align-items: center;
    cursor: pointer;
    .avatar {
      margin-right: 8px;
    }
  }
}
</style>
