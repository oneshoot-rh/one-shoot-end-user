import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  server: {
    port: 3000,
    proxy: {
      'tenants': {
        target: 'http://one_shoot_main.localhost/one-shoot-main/api/cl/', // TO be changed to target the api gateway instead
        changeOrigin: true,
      },
      'api': {
        target: 'http://one_shoot_main.localhost:80/oneshoot/api/',
        changeOrigin: true,
      }
      
    },
  },
})
