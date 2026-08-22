import QueryProvider from "@/provider/QueryProvider";
import "@/styles/subCommon.css";
import "../styles/globals.css";
import AuthProvider from "@/provider/AuthProvider";
export const metadata = {
  title: "판다마켓",
  description: "판다마켓",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <QueryProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}