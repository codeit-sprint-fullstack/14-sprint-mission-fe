import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "./providers";

const pretendard = localFont({
  src: "../fonts/Pretendard-Regular.otf",
  variable: "--font-pretendard",
});

const rokafSans = localFont({
  src: "../fonts/ROKAF-Sans-Medium.ttf",
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
        <Providers>
          <NavBar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
