import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";
import compression from "vite-plugin-compression";
import { VitePWA } from "vite-plugin-pwa";

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Compress assets
    compression({
      algorithm: "gzip",
      ext: ".gz",
      threshold: 10240, // Only compress files larger than 10kb
    }),
    // PWA support
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg"],
      manifest: {
        name: "Vonoy App",
        short_name: "Vonoy",
        icons: [
          {
            src: "/favicon.svg",
            sizes: "any",
            type: "image/svg+xml",
          },
        ],
      },
    }),
    // Bundle visualization in production builds
    process.env.ANALYZE === "true" && visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
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

  // Build optimization
  build: {
    target: "esnext",
    outDir: "dist",
    assetsDir: "assets",
    cssCodeSplit: true,
    sourcemap: process.env.NODE_ENV !== "production",
    minify: "esbuild",
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-tailwind': ['tailwind-merge', 'clsx'],
        },
        // Chunk naming pattern
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
      },
    },
    // Reduce chunk size warnings threshold
    chunkSizeWarningLimit: 1000,
  },

  // Server options
  server: {
    port: 3000,
    strictPort: false,
    open: true,
    cors: true,
    hmr: {
      overlay: true,
    },
  },

  // Preview options
  preview: {
    port: 4173,
    strictPort: false,
    open: true,
  },

  // Optimize deps
  optimizeDeps: {
    include: ["react", "react-dom", "clsx", "tailwind-merge"],
  },
});
