import Header from '../components/Header';
// 전역 CSS는 App Router에서 루트 레이아웃에만 import할 수 있다
import '../styles/reset.css';
import '../styles/index.css';
import '../styles/login.css';
import '../styles/modal.css';
import '../styles/signup.css';
import '../styles/items.css';
import '../styles/registration.css';
import '../styles/board.css';

export const metadata = {
  title: '판다마켓',
  description: '일상의 모든 물건을 거래해 보세요',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
