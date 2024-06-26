import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // https: true,
    port: 3000,
  },
  resolve: {
    alias: [{ find: "@/", replacement: "/src" }],
  }
})
