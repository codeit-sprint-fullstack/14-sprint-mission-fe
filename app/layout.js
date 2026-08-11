import LayoutShell from "@/components/LayoutShell";
import "./globals.css";

export const metadata = {
  title: "판다마켓",
  description: "판다마켓 자유게시판",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}