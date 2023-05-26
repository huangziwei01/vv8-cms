<template>
  <div class="main">
    <el-container class="main-container">
      <el-aside :width="isCollapse ? '55px' : '230px'" class="aside">
        <nav-menu :isFold="isCollapse"></nav-menu>
      </el-aside>
      <el-container class="page-container">
        <el-header class="page-header">
          <nav-header @fold-change="collapseChange"></nav-header>
        </el-header>
        <el-main class="page-content">
          <div class="content">
            <router-view v-slot="{ Component }">
              <transition name="fade" mode="out-in">
                <component :is="Component" />
              </transition>
            </router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import NavMenu from '@/components/nav-menu'
import NavHeader from '@/components/nav-header'
import { ref } from 'vue'

let isCollapse = ref(false)
const collapseChange = (isFold: boolean) => {
  isCollapse.value = isFold
}
</script>

<style scoped lang="less">
@baseBC: #fff;
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.main-container {
  height: 100%;
}

.aside {
  background-color: @baseBC;
  // height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  line-height: 100px;
  text-align: left;
  cursor: pointer;
  transition: width 0.3s linear;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */

  &::-webkit-scrollbar {
    display: none;
  }
}
.page-container {
  height: 100%;
}

.page-header {
  display: flex;
  color: #000;
  text-align: center;
  align-items: center;
}
.page-content {
  height: calc(100%-48px);
  background-color: #f5f5f5;
  .content {
    height: 100%;
    // background-color: #fff;
    // border-radius: 8px;
    // padding: 5px;
  }
}

.fade-enter-from,
.fade-leave-to {
  transform: translateX(30px);
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
.fade-enter-active {
  transition: all 0.7s ease;
}
.fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.6, 0.6, 1);
}
</style>
