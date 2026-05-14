import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/', // Serve da raiz do domínio
  build: {
    // O build vai direto para a raiz da pasta do back-end PHP
    outDir: 'C:/xampp/htdocs/socapas_back',
    emptyOutDir: false, // Importante: não apagar o PHP que já está lá!
  },
});
