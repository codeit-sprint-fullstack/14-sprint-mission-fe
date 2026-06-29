import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const frontendPort = 3003;

console.log(`✅ 프론트엔드 개발 서버가 ${frontendPort}번 포트에서 실행될 예정입니다`);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: frontendPort, // 개발 서버 포트를 고정
    strictPort: true,
  },  
})
