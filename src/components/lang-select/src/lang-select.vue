<template>
  <el-dropdown
    trigger="click"
    class="international"
    @command="handleSetLanguage"
  >
    <span class="el-dropdown-link">
      <el-icon><Switch /></el-icon>
      {{ $t('internationalization') }}
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :disabled="language === 'zh'" command="zh">
          中文
        </el-dropdown-item>
        <el-dropdown-item :disabled="language === 'en'" command="en">
          English
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { defineProps, computed } from 'vue'
// import { useStore } from 'vuex'
import { useSystemStore } from '@/store/system/system'
import { ElMessage } from 'element-plus'

const systemStore = useSystemStore()

// defineProps({
//   effect: {
//     type: String,
//     default: 'dark',
//     validator: function (value) {
//       // 这个值必须匹配下列字符串中的一个
//       return ['dark', 'light'].indexOf(value) !== -1
//     }
//   }
// })

// const store = useStore()
const language = computed(() => systemStore.language)

// 切换语言的方法
const i18n = useI18n()
const handleSetLanguage = (lang: string) => {
  i18n.locale.value = lang
  systemStore.changeLanguage(lang)
  ElMessage.success('切换成功')
}
</script>

<style scoped>
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}

.el-dropdown-link {
  display: flex;
  align-items: center;
  cursor: pointer;
}
</style>
