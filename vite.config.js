import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'export-to-csv': 'export-to-csv',
    },
  },
  optimizeDeps: {
    include: ['export-to-csv', 'jspdf', 'jspdf-autotable', 'material-react-table'],
  },
  build: {
    rollupOptions: {
      external: ['export-to-csv', 'jspdf', 'jspdf-autotable', 'material-react-table'],
    },
  },
});
