import './globals.css'

export const metadata = {
  title: '판다마켓',
  description: '믿을 수 있는 판다마켓, 일상의 모든 물건을 거래해보세요!',
}

function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}

export default RootLayout
