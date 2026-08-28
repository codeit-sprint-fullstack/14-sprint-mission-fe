import Providers from "./providers";
import "./globals.css";

export const metadata = {
  title: "판다마켓",
  description: "판다마켓",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
