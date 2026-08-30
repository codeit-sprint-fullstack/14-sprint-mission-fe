"use client";

import caretIcon from "@/assets/ic_caret.png";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import styles from "./Dropdown.module.css";

export default function Dropdown({ route }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get("orderBy") ?? "recent";
  const [isOpen, setIsOpen] = useState(false);

  function handleSort(sort) {
    // 기존 검색 조건을 유지하면서 정렬 조건만 변경
    const params = new URLSearchParams(searchParams.toString());
    params.set("orderBy", sort);
    params.set('page', '1');
    router.push(`${route}?${params.toString()}`);

    // 드롭다운 닫기
    setIsOpen(false);
  }

  return (
    <div className={styles.dropdownWrapper}>
      <button
        className={styles.dropdownBtn}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className={styles.btnText}>
          {currentSort === "recent" ? "최신순" : "좋아요순"}
        </p>
        <Image
          src={caretIcon}
          width={24}
          height={24}
          loading="eager"
          alt="드롭다운 아이콘"
        />
      </button>

      {isOpen && (
        <ul className={styles.dropdownMenu}>
          <li>
            <button
              className={styles.menuBtn}
              type="button"
              onClick={() => handleSort("recent")}
            >
              최신순
            </button>
          </li>
          <li>
            <button 
            className={styles.menuBtn} 
            type="button" 
            onClick={() => handleSort('favorite')}
            >
              좋아요순
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
