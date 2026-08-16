import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";

export default function MainLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
