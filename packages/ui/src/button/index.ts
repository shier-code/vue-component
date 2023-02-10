/*
 * @Desc:
 * @Version: v1.00
 * @Author: went
 * @Date: 2023-02-06 14:25:29
 * @LastEditors: went
 * @LastEditTime: 2023-02-09 15:27:43
 */
import type { App, Plugin } from 'vue'
import Button from './button.jsx'
Button.install = (app: App) => {
  app.component(Button.name, Button)
  return app
}
export default Button as typeof Button & Plugin
