/*
 * @Desc:
 * @Version: v1.00
 * @Author: went
 * @Date: 2023-02-06 14:25:22
 * @LastEditors: went
 * @LastEditTime: 2023-02-09 16:51:22
 */
import { defineComponent } from 'vue'
import { isStr } from '@jf/utils'
export default defineComponent({
  name: 'JFButton',
  setup() {
    return () => <div> isStr:{isStr(22)}</div>
  },
})
