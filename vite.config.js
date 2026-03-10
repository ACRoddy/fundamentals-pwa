import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['crest.JPG', 'images/**'],
      manifest: {
        name: 'Fundamentals — CLG Watty Graham',
        short_name: 'Fundamentals',
        description: 'Coaching app for CLG Watty Graham An Gleann Fundamentals sessions',
        theme_color: '#007A3D',
        background_color: '#007A3D',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: [
          { src: '/crest.JPG', sizes: '192x192', type: 'image/jpeg', purpose: 'any' },
          { src: '/crest.JPG', sizes: '512x512', type: 'image/jpeg', purpose: 'any maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,jpg,jpeg,svg,webp}'],
        runtimeCaching: [
          {
            urlPattern: /\/images\/.*/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'activity-images',
              expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
        ],
      },
    }),
  ],
})
