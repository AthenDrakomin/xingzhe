import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

// 加载 .env 文件
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/xingzhe/', // GitHub Pages base path
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom']
        }
      }
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  // 确保环境变量被正确传递
  define: {
    'process.env': process.env
  },
  // 修复 GitHub Pages 部署问题
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})