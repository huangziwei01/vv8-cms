<template>
  <div class="login-phone">
    <el-form
      label-width="60px"
      :model="phoneForm"
      :ref="phoneFormRef"
      status-icon
    >
      <el-form-item label="手机号">
        <el-input v-model="phoneForm.number"></el-input>
      </el-form-item>
      <el-form-item label="验证码">
        <div class="code">
          <el-input v-model="phoneForm.code"></el-input>
          <el-button type="primary">发送验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
const phoneForm = reactive({
  number: '',
  code: ''
})
const phoneFormRef = ref<FormInstance>()
</script>

<style lang="less" scoped>
.login-phone {
  .code {
    display: flex;
    .el-button {
      margin-left: 8px;
    }
  }
}
</style>
