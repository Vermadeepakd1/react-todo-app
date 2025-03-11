import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),  // Use Tailwind as a Vite plugin
  ],
  base: '/', // Ensures correct paths for assets in production
  build: {
    outDir: 'dist', // Ensure files are built into "dist/"
  }
});
