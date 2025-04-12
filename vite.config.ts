import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";
import compression from "vite-plugin-compression";
import { VitePWA } from "vite-plugin-pwa";
import { splitVendorChunkPlugin } from "vite";
import commonjs from "@rollup/plugin-commonjs";

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // CommonJS support
    commonjs({
      include: /node_modules/,
      transformMixedEsModules: true,
      requireReturnsDefault: 'auto',
    }),
    // React with fast refresh
    react({
      // Enable fast refresh for better DX
      fastRefresh: true,
      // Use Babel only for JSX transformation
      babel: {
        plugins: [
          // Add any Babel plugins here
        ],
      },
    }),
    // Tailwind CSS integration
    tailwindcss(),
    // Split vendor chunks automatically
    splitVendorChunkPlugin(),
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
    // Image optimization will be added when the package is available
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
      workbox: {
        // Cache strategies
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
            },
          },
          {
            urlPattern: /^https:\/\/img\.youtube\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'youtube-thumbnail-cache',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 1 week
              },
            },
          },
        ],
      },
    }),
    // HTML optimization will be added when the package is available
    // Bundle visualization in production builds
    process.env.ANALYZE === "true" && visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
      template: 'treemap', // Use treemap for better visualization
    }),
  ].filter(Boolean),

  // Resolve configuration
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@components": resolve(__dirname, "./src/components"),
      "@hooks": resolve(__dirname, "./src/hooks"),
      "@utils": resolve(__dirname, "./src/utils"),
      "@styles": resolve(__dirname, "./src/styles"),
      "@assets": resolve(__dirname, "./src/assets"),
    },
  },

  // Build optimization with latest techniques
  build: {
    target: "es2020",
    outDir: "dist",
    assetsDir: "assets",
    cssCodeSplit: true,
    // Only generate sourcemaps in development
    sourcemap: process.env.NODE_ENV !== "production",
    // Use esbuild for faster minification
    minify: "esbuild",
    // Enable CSS minification
    cssMinify: true,
    // Improve module preloading
    modulePreload: {
      polyfill: true,
    },
    // CommonJS compatibility
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
    },
    // Advanced rollup options
    rollupOptions: {
      output: {
        // Improved code splitting strategy
        manualChunks: (id) => {
          // Core React libraries
          if (id.includes('node_modules/react') ||
              id.includes('node_modules/react-dom')) {
            return 'vendor-react';
          }
          // Animation libraries
          if (id.includes('node_modules/animejs')) {
            return 'vendor-animation';
          }
          // UI utilities
          if (id.includes('node_modules/tailwind-merge') ||
              id.includes('node_modules/clsx') ||
              id.includes('node_modules/shadcn-ui')) {
            return 'vendor-ui';
          }
          // Router
          if (id.includes('node_modules/react-router')) {
            return 'vendor-router';
          }
        },
        // Chunk naming pattern with content hashing for better caching
        chunkFileNames: "assets/js/[name].[hash].js",
        entryFileNames: "assets/js/[name].[hash].js",
        assetFileNames: "assets/[ext]/[name].[hash].[ext]",
      },
    },
    // Reduce chunk size warnings threshold
    chunkSizeWarningLimit: 1200,
    // Report on performance
    reportCompressedSize: true,
  },

  // Server options with enhanced development experience
  server: {
    port: 3000,
    strictPort: false,
    open: true,
    cors: true,
    hmr: {
      overlay: true,
      // Faster HMR with websockets
      protocol: 'ws',
      // Improve HMR reliability
      timeout: 5000,
    },
    // Enable file watching for better HMR
    watch: {
      usePolling: false,
      interval: 100,
    },
  },

  // Preview options
  preview: {
    port: 4173,
    strictPort: false,
    open: true,
  },

  // Optimize dependencies with enhanced settings
  optimizeDeps: {
    // Pre-bundle these dependencies for faster startup
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "clsx",
      "tailwind-merge",
      "animejs",
      "react-error-boundary",
      "web-vitals"
    ],
    // Force optimization of these dependencies
    force: true,
    // Enable esbuild's dependency optimization
    esbuildOptions: {
      target: 'es2020',
      // Preserve JSX in dev for better debugging
      jsx: 'automatic',
      // Enable tree-shaking
      treeShaking: true,
    },
  },

  // Enable detailed performance reporting
  performance: {
    // Enable detailed performance metrics
    metrics: true,
    // Log performance metrics to console
    logPerformanceMetrics: true,
  },
});
