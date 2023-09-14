<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
/**
 * @params
 */
import { computed } from 'vue'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import { useSystemStore } from '@/store/system/system'

const systemStore = useSystemStore()
const locale = computed(() => {
  const test = systemStore.language === 'zh' ? zhCn : en
  console.log(locale)
  return test
})
</script>

<style lang="less"></style>
