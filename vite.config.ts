import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
    },
    resolve: {
        alias: {
            // Настраиваем алиасы для абсолютных импортов
            '@': path.resolve(__dirname, 'src'),
            'store': path.resolve(__dirname, 'src/store'),
            'api': path.resolve(__dirname, 'src/api'),
            'components': path.resolve(__dirname, 'src/components'),
            'constants': path.resolve(__dirname, 'src/constants'),
            'pages': path.resolve(__dirname, 'src/pages'),
            'root': path.resolve(__dirname, 'src/root'),
            'hooks': path.resolve(__dirname, 'src/hooks'),
        },
    },
})
