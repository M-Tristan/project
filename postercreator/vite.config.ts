import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }

  },
  css: {
    // //css预处理
    // preprocessorOptions: {
    //   scss: {

    //     additionalData: '@import "@/assets/scss/globalVariable.scss";'
    //   }
    // }
  }
})
