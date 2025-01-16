import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { Prerenderer } from '@prerenderer/prerenderer'
import Puppeteer from 'puppeteer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'prerender',
      async writeBundle() {
        const prerenderer = new Prerenderer({
          renderer: new Puppeteer({
            headless: true
          }),
          staticDir: path.join(__dirname, 'dist'),
          outputDir: path.join(__dirname, 'dist'),
          routes: ['/', '/privacy']
        })

        await prerenderer.initialize()
        await prerenderer.renderRoutes(['/', '/privacy'])
        await prerenderer.destroy()
      }
    }
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})