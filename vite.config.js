import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import VitePluginBrowserSync from 'vite-plugin-browser-sync'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePluginBrowserSync()],
  build: {
    sourcemap: false,
  },
})
