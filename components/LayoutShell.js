"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const HIDDEN_HEADER_FOOTER_PATHS = ["/login", "/signup"];

export default function LayoutShell({ children }) {
  const pathname = usePathname();
  const hideHeaderFooter = HIDDEN_HEADER_FOOTER_PATHS.includes(pathname);

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <main
        className={`pageWrapper${hideHeaderFooter ? "" : " withHeader"}`}
      >
        {children}
      </main>
      {!hideHeaderFooter && <Footer />}
    </>
  );
}