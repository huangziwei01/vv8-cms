<template>
  <div class="goods">
    <page-content :contentTableConfig="contentTableConfig" pageName="goods">
      <template #imageSlot="scoped">
        <el-image
          style="width: 60px"
          :src="scoped.row.imgUrl"
          :preview-src-list="[scoped.row.imgUrl]"
          :preview-teleported="true"
        ></el-image>
      </template>
      <template #status="scoped">
        <el-button :type="scoped.row.status ? 'success' : 'danger'">{{
          scoped.row.status ? '启用' : '禁用'
        }}</el-button>
      </template>
    </page-content>
  </div>
</template>

<script setup lang="ts">
import pageContent from '@/components/page-content'
import { contentTableConfig } from './config/content.config'
</script>

<style scoped></style>
