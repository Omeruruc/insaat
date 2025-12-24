import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    // Minification ve optimization
    minify: 'esbuild',
    cssMinify: true,
    // Chunk size optimization
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        // Code splitting için manual chunks
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'lucide': ['lucide-react'],
        },
      },
    },
    // Source maps sadece production'da kapalı
    sourcemap: false,
  },
});
