import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Enable minification
    minify: 'terser',
    // Configure terser options for better compression
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true,
      },
    },
    // Enable source maps for debugging
    sourcemap: false, // Disable in production for smaller bundle
    // Configure chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Configure rollup options for better chunking
    rollupOptions: {
      output: {
        // Manual chunks for better caching
        manualChunks: {
          // Vendor chunk for React and related libraries
          vendor: ['react', 'react-dom', 'react-router-dom'],
          // Three.js and globe libraries
          three: ['three', 'three-stdlib', 'react-globe.gl'],
        },
        // Configure chunk file names for better caching
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    // Target modern browsers for smaller bundle size
    target: 'es2022',
    // Enable CSS code splitting
    cssCodeSplit: true,
  },
  // Configure asset optimization
  assetsInclude: ['**/*.jpg', '**/*.png', '**/*.svg'],
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom',
      'react-globe.gl',
      'three',
      'three-stdlib'
    ],
    // Force pre-bundling of problematic dependencies
    force: true,
  },
});
