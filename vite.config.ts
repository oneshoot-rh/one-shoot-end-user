import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  server: {
    port: 3000,
    host: 'oneshoot.local',
    proxy: {
      '/tenants': {
        target: 'http://one_shoot_main.local/one-shoot-main/api/cl', // TO be changed to target the api gateway instead
        secure: false,
        ws: true,
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('Requesting: ' + req.url);
          }
          )
        }
            
      },
      'api': {
        target: 'http://one_shoot_main.local:80/oneshoot/api/',
        changeOrigin: true,
        secure: false,
        ws: true,
      }
      
    },
  },
})
