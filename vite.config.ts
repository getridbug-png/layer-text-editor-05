import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import puppeteer from 'puppeteer'
import prerenderer from '@prerenderer/prerenderer'

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
        const browser = await puppeteer.launch({ headless: 'new' })
        const renderer = new prerenderer.Renderer({
          renderAfterDocumentEvent: 'render-event',
          renderer: {
            implementation: browser,
            renderAfterTime: 5000
          }
        })

        const prerenderInstance = new prerenderer.Prerenderer({
          staticDir: path.join(__dirname, 'dist'),
          renderer
        })

        try {
          await prerenderInstance.initialize()
          await prerenderInstance.renderRoutes(['/', '/privacy'])
        } finally {
          await prerenderInstance.destroy()
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