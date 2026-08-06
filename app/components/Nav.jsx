"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Nav.module.css";

const MENUS = [
  { href: "/posts", label: "자유게시판" },
  { href: "/items", label: "중고마켓" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <ul className={styles.menu}>
      {MENUS.map(({ href, label }) => (
        <li key={href}>
          <Link
            href={href}
            className={pathname.startsWith(href) ? styles.active : ""}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
