"use client";

import Image from "next/image";
import styles from "./SearchInput.module.css";

export default function SearchInput({ value, onChange, placeholder }) {
  return (
    <div className={styles.searchInput}>
      <Image
        src="/images/ic_search.svg"
        alt=""
        width={24}
        height={24}
        className={styles.searchIcon}
      />

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={styles.input}
      />
    </div>
  );
}
