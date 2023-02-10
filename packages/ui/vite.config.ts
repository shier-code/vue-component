/*
 * @Desc:
 * @Version: v1.00
 * @Author: went
 * @Date: 2023-02-09 14:56:08
 * @LastEditors: went
 * @LastEditTime: 2023-02-10 10:11:02
 */
import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
export default defineConfig({
  build: {
    target: 'modules',
    outDir: 'es',
    emptyOutDir: false,
    minify: false,
    rollupOptions: {
      external: [
        'vue',
        '@yanyu-fe/utils',
      ],
      input: ['src/index.ts'],
      output: [
        // esm
        {
          format: 'es',
          dir: 'es',
          entryFileNames: '[name].js',
          preserveModules: true,
          preserveModulesRoot: 'src',
        },
        // cjs
        {
          format: 'cjs',
          dir: 'lib',
          entryFileNames: '[name].js',
          preserveModules: true,
          preserveModulesRoot: 'src',
        },
      ],
    },
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'cjs'],
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    dts(),
  ],
})
