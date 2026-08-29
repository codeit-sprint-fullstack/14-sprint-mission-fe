"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./detail.module.css";

export default function ProductMoreMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        className={styles.moreButton}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="더보기"
      >
        <Image
          src="/images/board/ic_kebab.svg"
          alt="더보기"
          width={24}
          height={24}
        />
      </button>

      {isOpen && (
        <div className={styles.menu}>
          <button type="button">수정하기</button>
          <button type="button">삭제하기</button>
        </div>
      )}
    </div>
  );
}