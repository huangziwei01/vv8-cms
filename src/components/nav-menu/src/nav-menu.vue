<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.svg" alt="logo" />
      <span v-show="!isCollapse" class="title">{{ $t('navMenuTitle') }}</span>
    </div>
    <el-menu
      :default-active="currentItemId"
      class="el-menu-vertical"
      background-color="#fff"
      :collapse="isCollapse"
      text-color="#000000"
      active-text-color="#000000"
    >
      <template v-for="item in menus" :key="item.id">
        <!-- 判断二级菜单 -->
        <template v-if="item.type == 1 && item.children.length">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon><location /></el-icon>
              <span>{{ $t(item.name) }}</span>
            </template>
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                :index="subitem.id + ''"
                @click="handleItemClick(subitem)"
              >
                <i v-if="subitem.icon" :class="subitem.icon"></i>
                <span>{{ $t(subitem.name) }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else>
          <el-menu-item :index="item.id + ''" @click="handleItemClick(item)">
            <i v-if="item.icon" :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUserStore } from '@/store/user/user'
import { useRoute, useRouter } from 'vue-router'
import { pathMapToMenu } from '@/utils/pathMapToMenu'
import { useSystemStore } from '@/store/system/system'

const systemStore = useSystemStore()

const props = defineProps({
  isFold: Boolean
})
const isCollapse = computed(() => props.isFold)

const userStore = useUserStore()
const menus = userStore.userMenu

const router = useRouter()
const handleItemClick = (item: any) => {
  router.push(item.url ?? '')
}

let currentItemId = ref('')
const currentRoute = useRoute()
const menu = pathMapToMenu(menus, currentRoute.path)
currentItemId.value = menu.id + ''
</script>

<style lang="less" scoped>
@baseBC: #fff;
@baseFC: #000;
@activeBC: #f5f5f5;
@activeFC: #000;
@hoverBC: #fff;
@hoverFC: #000;
.nav-menu {
  height: 100%;
  background-color: @baseBC;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    border-right: 2px solid #f5f5f5;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: #000;
    }
  }

  // 目录
  .el-sub-menu {
    background-color: @baseBC;
    font-weight: 700;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: @hoverBC !important;
    }
  }

  ::v-deep .el-sub-menu__title {
    background-color: @baseBC !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    background-color: @hoverBC !important;
    color: @hoverFC !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #000 !important;
    background-color: @activeBC !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 260px;
  height: 100%;
}
</style>
