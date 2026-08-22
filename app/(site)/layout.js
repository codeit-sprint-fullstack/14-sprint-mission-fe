import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function SiteLayout({ children }) {
  return (
    <div className="page-shell">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
