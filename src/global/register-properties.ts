import { App } from 'vue'
import formatUtcString from '@/utils/day-format'

export default function (app: App) {
  app.config.globalProperties.$filters = {
    formatUtcTime(value: string) {
      return formatUtcString(value)
    }
  }
}
