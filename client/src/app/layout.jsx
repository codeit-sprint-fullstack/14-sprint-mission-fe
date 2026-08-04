import localfont from 'next/font/local';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const pretendard = localfont({
  src: '../assets/fonts/PretendardVariable.woff2',
  display: 'swap',
  variable: '--font-pretendard',
})

export const metadata = {
  title: 'pandamarket',
  description: 'sprint mission - next',
};

export default function RootLayout({ children }) {
  return (
    <html lang='ko'>
      <body className={pretendard.variable}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
