import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '',
  define: {
    global: {}
  },
  server: {
    port: 5000,
  },
  resolve: {
    alias: {
    },
    dedupe: ['react', 'react-dom']
  },
  optimizeDeps: {
    include: ['export-to-csv', 'jspdf-autotable', 'jspdf-autotable', 'material-react-table'],
  },
  build: {
    rollupOptions: {
      external: ['export-to-csv', 'jspdf-autotable', 'jspdf-autotable', 'material-react-table'],
    },
  },
});
