import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import puppeteer from 'puppeteer'
import { Prerenderer } from '@prerenderer/prerenderer'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    {
      name: 'prerender',
      async writeBundle() {
        // Launch puppeteer with specific args to avoid dependency issues
        const browser = await puppeteer.launch({
          headless: true,
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage'
          ]
        });

        // Create prerenderer instance
        const prerenderer = new Prerenderer({
          staticDir: path.join(__dirname, 'dist'),
          renderer: {
            implementation: 'puppeteer',
            renderAfterTime: 5000,
            options: {
              browser,
              maxConcurrentRoutes: 4
            }
          }
        });

        try {
          await prerenderer.initialize()
          await prerenderer.renderRoutes(['/', '/privacy'])
        } finally {
          await prerenderer.destroy()
          await browser.close()
        }
      }
    }
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})