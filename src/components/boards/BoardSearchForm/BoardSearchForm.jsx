"use client";

import SearchInput from "@/components/SearchInput/SearchInput";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./BoardSearchForm.module.css";

export default function BoardSearchForm({ initialKeyword = "" }) {
  const [keyword, setKeyword] = useState(initialKeyword);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedKeyword = keyword.trim();

    if (!trimmedKeyword) {
      router.push("/boards");
      return;
    }

    const encodedKeyword = encodeURIComponent(trimmedKeyword);
    router.push(`/boards?keyword=${encodedKeyword}`);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <SearchInput
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="검색할 게시글을 입력해 주세요"
      />
    </form>
  );
}
