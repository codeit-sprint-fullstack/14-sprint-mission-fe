import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";
import "./globals.css";
import localFont from "next/font/local";

const pretendard = localFont({
  src: "../fonts/Pretendard-Regular.otf",
  variable: "--font-pretendard",
});

const rokafSans = localFont({
  src: "../fonts/ROKAF Sans Bold.otf",
  variable: "--font-rokaf",
});

export const metadata = {
  title: "판다마켓",
  description: "판다마켓입니다.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} ${rokafSans.variable}`}>
        <NavBar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
