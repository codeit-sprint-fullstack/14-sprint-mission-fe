// app/layout.js
import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "판다마켓",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <header>
          <Link href="/">판다마켓</Link>
        </header>
        <main className="siteContainer">{children}</main>
      </body>
    </html>
  );
}
