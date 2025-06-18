import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy' // 👈 ESTE import es necesario

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'dist/index.html',
          dest: '.', // esto copia como 404.html dentro de dist
          rename: '404.html'
        }
      ]
    })
  ],
  base: '/CUESTIONARIO_STEM_PLAY/', // 👈 cambia esto si tu repo se llama distinto
})
