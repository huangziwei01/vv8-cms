<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <template v-for="item in breadCrumbs" :key="item.path">
        <el-breadcrumb-item
          :to="item.path == undefined ? route.path : { path: item.path }"
          >{{ $t(item.name) }}</el-breadcrumb-item
        >
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { IBreadCrumb } from '../types'
import { useRoute } from 'vue-router'
const props = defineProps<{
  breadCrumbs: IBreadCrumb[]
}>()
const route = useRoute()
</script>

<style scoped></style>
