import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  accountLoginRequest,
  requestUserInfo,
  requestUserMenu
} from '@/api/login/login'
import { IAccount } from './type'
import localStorage from '@/utils/cache'
import generateRoutes from '@/utils/generateRoutes'
import router from '@/router'
import menuMapToPermission from '@/utils/menuMapToPermission'

export const useUserStore = defineStore('user', () => {
  const userId = ref(0)
  const token = ref('')
  const userInfo = ref<any>()
  const userMenu = ref<any>()
  const userPermissions = ref<any[]>([])
  async function getLoginData(account: IAccount) {
    //获取token
    const loginRes = await accountLoginRequest(account)
    token.value = loginRes.token
    userId.value = loginRes.id
    localStorage.setCache('token', loginRes.token)
    localStorage.setCache('userId', loginRes.id)

    //获取用户信息
    const userInfoRes = await requestUserInfo(userId.value)
    userInfo.value = userInfoRes
    localStorage.setCache('userInfo', userInfoRes)

    //获取用户菜单
    const userMenuRes = await requestUserMenu(userInfo.value.role.id)
    userMenu.value = userMenuRes
    localStorage.setCache('userMenu', userMenuRes)

    //根据用户菜单生成动态路由
    const routes = generateRoutes(userMenu.value)
    for (const route of routes) {
      router.addRoute('main', route)
    }

    //登录后跳转
    router.push('/main')
  }
  function setupUserStore() {
    const Ltoken = localStorage.getCache('token')
    const LUserId = localStorage.getCache('userId')
    const LUserInfo = localStorage.getCache('userInfo')
    const LUserMenu = localStorage.getCache('userMenu')
    if (Ltoken) {
      token.value = Ltoken
    }
    if (LUserId) {
      userId.value = LUserId
    }
    if (LUserInfo) {
      userInfo.value = LUserInfo
    }
    if (LUserMenu) {
      userMenu.value = LUserMenu
      const routes = generateRoutes(userMenu.value)
      for (const route of routes) {
        router.addRoute('main', route)
      }
      //根据菜单获取全部按钮权限
      const permissions = menuMapToPermission(userMenu.value)
      userPermissions.value = permissions
    }
  }
  return {
    userId,
    token,
    userInfo,
    userMenu,
    userPermissions,
    getLoginData,
    setupUserStore
  }
})
