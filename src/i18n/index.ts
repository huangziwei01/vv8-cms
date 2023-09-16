import { createI18n } from 'vue-i18n'

import localStorage from '@/utils/cache'

import { zhLocale, enLocale } from './lang/index'

const messages = {
  en: {
    ...enLocale
  },
  zh: {
    ...zhLocale
  }
}

const locale = localStorage.getCache('lang')

const i18n = createI18n({
  // 使用 Composition API 模式，则需要将其设置为false
  legacy: false,
  // 全局注入 $t 函数
  globalInjection: true,
  locale,
  messages
})

export default i18n
