"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import styles from "./items.module.css";

export default function ProductControls({ orderBy, keyword }) {
  const router = useRouter();
  const pathname = usePathname();

  const [inputValue, setInputValue] = useState(keyword);
  const [isOpen, setIsOpen] = useState(false);

  const sortLabel = orderBy === "recent" ? "최신순" : "좋아요순";

  useEffect(() => {
    const timer = setTimeout(() => {
      updateParams({ keyword: inputValue, page: "1" });
    }, 500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  function updateParams(next) {
    const params = new URLSearchParams({
      orderBy,
      keyword,
      page: "1",
      ...next,
    });
    if (!params.get("keyword")) params.delete("keyword");
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className={styles.productsControls}>
      <div className={styles.searchRegisterGroup}>
        <div className={styles.searchBox}>
          <Image
            src="/images/icons/ic_search.svg"
            alt=""
            width={24}
            height={24}
            className={styles.searchIcon}
          />
          <input
            type="text"
            placeholder="검색할 상품을 입력해주세요"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>

        <button
          className={styles.registerButton}
          onClick={() => router.push("/items/add")}
        >
          상품 등록하기
        </button>
      </div>

      <div className={styles.sortWrapper}>
        <button
          className={styles.sortButton}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={styles.sortLabel}>{sortLabel}</span>
          <Image
            src="/images/icons/ic_arrow_down.svg"
            alt=""
            width={24}
            height={24}
            className={styles.sortIconDesktop}
          />
          <Image
            src="/images/icons/ic_sort.svg" // 모바일 전용 아이콘
            alt=""
            width={20}
            height={20}
            className={styles.sortIconMobile}
          />
        </button>

        {isOpen && (
          <ul className={styles.sortDropdown}>
            <li
              onClick={() => {
                updateParams({ orderBy: "recent" });
                setIsOpen(false);
              }}
            >
              최신순
            </li>
            <li
              onClick={() => {
                updateParams({ orderBy: "favorite" });
                setIsOpen(false);
              }}
            >
              좋아요순
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
