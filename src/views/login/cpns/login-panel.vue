<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs
      type="border-card"
      :stretch="true"
      class="login-tabs"
      v-model="currentTab"
    >
      <el-tab-pane name="account">
        <template #label>
          <span class="tab-item">
            <el-icon :size="20"><User /></el-icon>
            <span class="tab-item-title">账号登录</span>
          </span>
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>

      <el-tab-pane name="phone">
        <template #label>
          <span class="tab-item">
            <el-icon :size="20"><Cellphone /></el-icon>
            <span class="tab-item-title">手机登录</span>
          </span>
        </template>
        <login-phone />
      </el-tab-pane>
    </el-tabs>
    <div class="login-help">
      <el-checkbox v-model="isKeepPassWord">记住密码</el-checkbox>
      <el-link>忘记密码？</el-link>
    </div>
    <el-button type="primary" class="login-btn" @click="handleClick"
      >立即登录</el-button
    >
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'
let isKeepPassWord = ref(true)
const accountRef = ref<InstanceType<typeof LoginAccount>>()
const currentTab = ref('account')

const handleClick = () => {
  if (currentTab.value == 'account') {
    accountRef.value?.accountLogin(isKeepPassWord.value)
  }
}
</script>

<style lang="less" scoped>
.login-panel {
  width: 350px;
  transform: translateY(-50%);
  .title {
    text-align: center;
  }
  .tab-item {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .tab-item-title {
    font-weight: 700;
  }
  .el-icon {
    margin-right: 5px;
  }
  .el-tabs {
    border-radius: 8px;
  }
  .login-help {
    display: flex;
    justify-content: space-between;
  }
  .login-btn {
    width: 100%;
  }
}
</style>
