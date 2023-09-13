<template>
  <div class="login-account">
    <el-form
      label-width="60px"
      :rules="rules"
      :model="accountForm"
      ref="accountFormRef"
      status-icon
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model="accountForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="accountForm.password" show-password></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { accountRule } from '../config/account-rule'
import type { FormInstance, FormRules } from 'element-plus'
import localStorage from '@/utils/cache'
import { useUserStore } from '@/store/user/user'

const accountForm = reactive({
  name: localStorage.getCache('name') ?? 'coderwhy',
  password: localStorage.getCache('password') ?? '123456'
})
const accountFormRef = ref<FormInstance>()
const rules = reactive<FormRules>(accountRule)

const userStore = useUserStore()
const accountLogin = (isKeepPassWord: boolean) => {
  accountFormRef.value?.validate((valid, fields) => {
    if (valid) {
      //记住密码功能
      if (isKeepPassWord) {
        localStorage.setCache('name', accountForm.name)
        localStorage.setCache('password', accountForm.password)
      } else {
        localStorage.deleteCache('name')
        localStorage.deleteCache('password')
      }
      userStore.getLoginData(accountForm)
    } else {
      console.log('error submit!', fields)
    }
  })
}
defineExpose({
  accountLogin
})
</script>

<style scoped></style>
