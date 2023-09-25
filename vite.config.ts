import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { svg4VuePlugin } from 'vite-plugin-svg4vue'

import { resolve } from 'node:path'

const isBuildLib = () => {
  return process.env.BUILD_TYPE === 'lib'
}

const outDir = isBuildLib() ? 'lib' : 'dist'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), svg4VuePlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~': fileURLToPath(new URL('./src', import.meta.url)),
      '@@': fileURLToPath(new URL('./', import.meta.url)),
      '~~': fileURLToPath(new URL('./', import.meta.url)),
    },
  },
  build: isBuildLib()
    ? {
        outDir,
        target: 'es2015',
        lib: {
          // Could also be a dictionary or array of multiple entry points
          entry: resolve(__dirname, 'src/packages/index.ts'),
          name: 'Vitaminc',
          // the proper extensions will be added
          fileName: 'vitaminc',
          formats: ['es', 'cjs'],
        },
        rollupOptions: {
          // external: [],
        },
        copyPublicDir: false,
        cssTarget: ['chrome35'],
      }
    : { outDir },
})
