/*
 * @Desc:
 * @Version: v1.00
 * @Author: went
 * @Date: 2023-02-06 14:25:01
 * @LastEditors: went
 * @LastEditTime: 2023-02-10 09:40:52
 */
import type { App } from 'vue'
import * as components from './components'
export * from './components'
export default {
  install: (app: App) => {
    for (const component in components) {
      const comp = components[component]
      if (comp.install)
        app.use(comp)
    }
    return app
  },
}
