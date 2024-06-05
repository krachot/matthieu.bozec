import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    css: {
        devSourcemap: true
    },
    build: {
        outDir: resolve(__dirname, 'dist'),
        emptyOutDir: false,
        sourcemap: 'hidden',
        manifest: true,
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/assets/js/main.js')
            },
            output: {
                assetFileNames: 'assets/css/[name].[hash].css',
                chunkFileNames: 'assets/js/[name].[hash].js',
                entryFileNames: 'assets/js/[name].[hash].js'
            }
        }
    },
    resolve: {
        alias: {
            '@assets': resolve(__dirname, 'src/assets')
        }
    }
})
