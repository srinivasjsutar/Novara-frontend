import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vike from 'vike/plugin'
import path from 'path'

export default defineConfig({
  plugins: [
    vike(),
    react(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
  },
  build: {
    target: 'es2019',
    outDir: 'build',
    minify: 'esbuild',
    sourcemap: false,
    cssCodeSplit: true,
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) return 'react-vendor';
          if (id.includes('node_modules/framer-motion')) return 'motion';
          if (id.includes('node_modules/gsap')) return 'gsap';
          if (id.includes('node_modules/swiper')) return 'swiper';
          if (id.includes('node_modules/formik') || id.includes('node_modules/yup')) return 'forms';
          if (id.includes('node_modules/embla-carousel')) return 'carousel';
        },
      },
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2019',
      loader: {
        '.js': 'jsx',
        '.jsx': 'jsx',
      },
    },
  },
  esbuild: {
    loader: 'jsx',
    include: /.*\.[jt]sx?$/,
    exclude: [],
    drop: ['console', 'debugger'],
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  },
})