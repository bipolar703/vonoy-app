import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { VitePWA } from 'vite-plugin-pwa';
import compression from 'vite-plugin-compression';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // React with fast refresh
    react(),

    // Compress assets with both gzip and brotli
    compression({
      algorithm: "gzip",
      ext: ".gz",
      threshold: 5120, // Lower threshold to 5kb for better compression coverage
    }),
    compression({
      algorithm: "brotliCompress",
      ext: ".br",
      threshold: 5120,
    }),

    // Image optimization with modern plugin
    ViteImageOptimizer({
      png: {
        quality: 80,
        compressionLevel: 9,
      },
      jpeg: {
        quality: 80,
        progressive: true,
      },
      jpg: {
        quality: 80,
        progressive: true,
      },
      webp: {
        quality: 80,
        lossless: false,
      },
      svg: {
        multipass: true,
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                removeViewBox: false,
              },
            },
          },
        ],
      },
    }),

    // PWA support with enhanced options
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "robots.txt", "apple-touch-icon.png"],
      manifest: {
        name: "Vonoy App",
        short_name: "Vonoy",
        description: "Optimize Your Logistics with AI-Powered Routing",
        theme_color: "#3dd598",
        background_color: "#06041f",
        display: "standalone",
        icons: [
          {
            src: "/favicon.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "any maskable",
          },
          {
            src: "/icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],

  // Resolve configuration
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@hooks': resolve(__dirname, './src/hooks'),
      '@utils': resolve(__dirname, './src/utils'),
      '@styles': resolve(__dirname, './src/styles'),
      '@assets': resolve(__dirname, './src/assets'),
    },
  },

  // Server options with enhanced development experience
  server: {
    port: 3000,
    open: true,
    hmr: {
      overlay: true,
    },
  },

  // Build optimization with latest techniques
  build: {
    target: "es2022", // Updated to match TypeScript target
    outDir: "dist",
    assetsDir: "assets",
    cssCodeSplit: true,
    sourcemap: process.env.NODE_ENV !== "production",
    minify: "esbuild",
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': [
            'react',
            'react-dom',
            'react-error-boundary'
          ],
          'vendor-router': [
            'react-router-dom'
          ],
          'vendor-animation': [
            'animejs',
            'framer-motion'
          ],
          'vendor-ui': [
            'clsx',
            'tailwind-merge'
          ]
        },
        chunkFileNames: "assets/js/[name].[hash].js",
        entryFileNames: "assets/js/[name].[hash].js",
        assetFileNames: 'assets/[ext]/[name].[hash][extname]'
      }
    },
    chunkSizeWarningLimit: 1600,
  },

  // CSS processing options
  css: {
    devSourcemap: true,
    // PostCSS configuration is in postcss.config.cjs
  },
});
