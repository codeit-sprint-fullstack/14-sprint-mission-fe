import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import ScrollTopButton from './components/ScrollTopButton.jsx';
import ArticleDetailPage from './pages/ArticleDetailPage.jsx';
import ArticleListPage from './pages/ArticleListPage.jsx';
import ArticleRegistrationPage from './pages/ArticleRegistrationPage.jsx';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import MarketPage from './pages/MarketPage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import ProductRegistrationPage from './pages/ProductRegistrationPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import SimplePage from './pages/SimplePage.jsx';

function LandingLayout() {
  return (
    <div className="page-shell">
      <Header logoMode="scrollTop" />
      <main className="pt-[4.375rem]">
        <HomePage />
      </main>
      <Footer />
    </div>
  );
}

function StandardLayout({ children }) {
  return (
    <div className="page-shell">
      <Header />
      <main className="pt-[4.375rem]">{children}</main>
      <ScrollTopButton />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingLayout />} />
      <Route path="/items" element={<MarketPage />} />
      <Route path="/items/:productId" element={<ProductDetailPage />} />
      <Route path="/registration" element={<ProductRegistrationPage />} />
      <Route path="/free-board" element={<ArticleListPage />} />
      <Route path="/free-board/new" element={<ArticleRegistrationPage />} />
      <Route path="/free-board/:articleId" element={<ArticleDetailPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route
        path="/policy"
        element={(
          <StandardLayout>
            <SimplePage title="Privacy Policy" links={[['/faq', 'FAQ'], ['/', '홈으로 돌아가기']]} />
          </StandardLayout>
        )}
      />
      <Route
        path="/faq"
        element={(
          <StandardLayout>
            <SimplePage title="FAQ" links={[['/policy', 'Privacy Policy'], ['/', '홈으로 돌아가기']]} />
          </StandardLayout>
        )}
      />
      <Route
        path="*"
        element={(
          <StandardLayout>
            <SimplePage title="페이지를 찾을 수 없습니다" links={[[ '/', '홈으로 돌아가기' ]]} />
          </StandardLayout>
        )}
      />
    </Routes>
  );
}

export default App;
