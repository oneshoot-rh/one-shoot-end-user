import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  server: {
    port: 3000,
    host: 'oneshoot.local',
    proxy: {
      '/cl': {
        target: 'http://oneshootmain.oneshoot.local:80//one-shoot-main/api/', 
        secure: false,
        changeOrigin: true,
        ws: true,
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('Requesting: ' + req.url);
          })
        }    
      },
      '/api': {
        target: 'http://org1710248699666.oneshoot.local:80//one-shoot-main/',
        changeOrigin: true,
        secure: false,
        ws: true,
      }
    },
  },
})
