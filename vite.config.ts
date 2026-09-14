import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const shopifyToken = (env.SHOPIFY_ACCESS_TOKEN || '').trim()

  // Debug: confirm token is loaded at startup
  console.log('[vite] Shopify Admin token loaded:', shopifyToken ? `${shopifyToken.slice(0, 6)}...` : 'EMPTY!')

  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      proxy: {
        '/shopify-admin': {
          target: 'https://b15301-8f.myshopify.com',
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/shopify-admin/, ''),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              proxyReq.setHeader('X-Shopify-Access-Token', shopifyToken)
              proxyReq.setHeader('Content-Type', 'application/json')
            })
            // Remove WWW-Authenticate header so browser does NOT show Basic Auth popup
            proxy.on('proxyRes', (proxyRes) => {
              delete proxyRes.headers['www-authenticate']
            })
          },
        },
      },
    },
    build: {
      // Never inline assets as base64 — always emit as files for proper caching
      assetsInlineLimit: 0,
      // Increase chunk size warning threshold
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        output: {
          // Split large vendor libraries into separate cacheable chunks
          manualChunks(id: string) {
            if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router')) {
              return 'react-vendor';
            }
            if (id.includes('node_modules/framer-motion')) {
              return 'framer';
            }
            if (id.includes('node_modules/swiper')) {
              return 'swiper';
            }
            if (id.includes('node_modules/@mui')) {
              return 'mui';
            }
          },
        },
      },
    },
  }
})