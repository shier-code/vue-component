/*
 * @Desc:
 * @Version: v1.00
 * @Author: went
 * @Date: 2023-02-09 16:13:24
 * @LastEditors: went
 * @LastEditTime: 2023-02-09 16:18:16
 */
import { defineBuildConfig } from 'unbuild'
export default defineBuildConfig({
  entries: [
    './src/index',
  ],
  declaration: true,
  rollup: {
    emitCJS: true,
  },
})
