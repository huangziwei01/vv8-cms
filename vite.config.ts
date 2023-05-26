import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// path模块是node.js内置的功能，但是node.js本身并不支持ts
// 解决方案：安装@types/node
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://111.230.245.205:8880',
        changeOrigin: true,
        rewrite: (path) => path.replace('/api', '')
      }
    }
  }
})
