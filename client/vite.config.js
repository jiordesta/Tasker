import { defineConfig} from "vite"
import react from '@vitejs/plugin-react'
export default defineConfig({
    plugins:[
        react(),
    ],
    server:{
        proxy: {
            '/tma':{
                target: 'http://localhost:8800/tma',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/tma/, '')
            }
        }
    }
})