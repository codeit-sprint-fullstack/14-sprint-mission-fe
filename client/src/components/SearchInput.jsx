"use client";

import searchIcon from "@/assets/ic_search.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./SearchInput.module.css";

export default function SearchInput({
  type = "text",
  placeholder,
  route,
  variant,
}) {
  const className = `
    ${styles.input}
    ${variant === "product" ? styles.product : ""}
  `;

  const router = useRouter();
  const [value, setValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!value) {
      router.push(route);
      return;
    }

    const encodedValue = encodeURIComponent(value);
    router.push(`${route}?keyword=${encodedValue}`);
  }

  return (
    <form onSubmit={handleSubmit} className={styles.inputForm}>
      <button className={styles.inputIcon}>
        <Image
          src={searchIcon}
          width={24}
          height={24}
          loading="eager"
          alt="검색 아이콘"
        />
      </button>
      <input
        className={className}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
      />
    </form>
  );
}
