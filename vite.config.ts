import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  server: {
    port: 3000,
    //host: 'oneshoot.local',
    proxy: {
      '/tenantService': {
        target: 'http://tenantService.oneshoot.local:80//', 
        secure: false,
        changeOrigin: true,
        ws: true,
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('Requesting: ' + req.url);
          })
        }    
      },
      '/onboarding': {
        target: 'http://myorg.oneshoot.local:80//',  // until finding best wat to dynamically set the target based on tenant's subdomain
        changeOrigin: true,
        secure: false,
        ws: true,
      }
    },
  },
})
