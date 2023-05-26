import { App } from 'vue'

import registerProperties from './register-properties'
import registerElement from './register-element'
export function RegisterApp(app: App) {
  registerElement(app)
  registerProperties(app)
}
