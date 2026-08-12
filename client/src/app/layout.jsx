import localfont from "next/font/local";
import "./globals.css";

const pretendard = localfont({
  src: "../assets/fonts/PretendardVariable.woff2",
  display: "swap",
  variable: "--font-pretendard",
});

export const metadata = {
  title: "pandamarket",
  description: "sprint mission - next",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className={pretendard.variable}>
        <main className="main">
          <div>{children}</div>
        </main>
      </body>
    </html>
  );
}
