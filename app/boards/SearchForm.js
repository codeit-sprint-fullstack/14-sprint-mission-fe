"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./SearchForm.module.css";

export default function SearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    const keyword = e.target.elements.keyword.value.trim();
    const params = new URLSearchParams(searchParams.toString());
    if (keyword) {
      params.set("keyword", keyword);
    } else {
      params.delete("keyword");
    }
    router.push(`/boards?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchForm}>
      <Image
        src="/images/icons/ic_search.svg"
        alt=""
        width={20}
        height={20}
        className={styles.icon}
      />
      <input
        name="keyword"
        type="text"
        placeholder="검색할 게시글 제목을 입력해주세요"
        defaultValue={searchParams.get("keyword") ?? ""}
        className={styles.input}
      />
    </form>
  );
}