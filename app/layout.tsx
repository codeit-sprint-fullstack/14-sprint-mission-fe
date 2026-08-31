import type { Metadata } from 'next';
import './globals.css';
import AuthProvider from './components/authProvider';
import Header from './components/header';



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-full flex flex-col">
    <AuthProvider>
      <Header/>
    {children}
    </AuthProvider>
      </body>
    </html>
   
  );
}
