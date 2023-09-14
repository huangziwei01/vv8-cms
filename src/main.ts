import { createApp } from 'vue'
import { RegisterApp } from './global'
import App from './App.vue'

import 'normalize.css'
import './assets/css/index.less'

import router from './router'
import pinia from './store'
import { useUserStore } from '@/store/user/user'
import { useSystemStore } from './store/system/system'

import i18n from '@/i18n'

const app = createApp(App)

RegisterApp(app)
app.use(i18n)

app.use(pinia)
//要先生成路由才能进行app.use(router)
useUserStore().setupUserStore()
// useSystemStore().setupSystemStore()
app.use(router)

app.mount('#app')
