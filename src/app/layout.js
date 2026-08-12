import QueryProvider from "@/provider/QueryProvider";
import "@/styles/subCommon.css";
import "../styles/globals.css";
export const metadata = {
  title: "판다마켓",
  description: "판다마켓",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}