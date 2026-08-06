import localFont from 'next/font/local';
import './globals.css';

const rokafSans = localFont({
  src: '../public/fonts/ROKAF Sans Bold.ttf',
  display: 'swap',
  variable: '--font-rokaf',
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: '판다마켓',
    template: '%s | 판다마켓',
  },
  description: '일상의 모든 물건을 믿고 거래하는 판다마켓',
  applicationName: '판다마켓',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: '판다마켓',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" data-scroll-behavior="smooth">
      <body className={rokafSans.variable}>{children}</body>
    </html>
  );
}
