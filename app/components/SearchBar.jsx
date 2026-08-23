"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import searchIc from "@/public/icon_search.png";
import styles from "./SearchBar.module.css";
import Image from "next/image";

export default function SearchBar({ initialValue = "" }) {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");

  function handleChange(e) {
    setKeyword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!keyword) {
      router.push("/posts");
      return;
    }

    const encodedValue = encodeURIComponent(keyword);
    router.push(`/posts?q=${encodedValue}`);
  }

  return (
    <div className={styles.search}>
      <form onSubmit={handleSubmit}>
        <Image src={searchIc} alt="" width={24} height={24} />
        <input
          name="q"
          value={keyword}
          onChange={handleChange}
          placeholder="검색할 키워드를 입력해주세요"
        />
      </form>
    </div>
  );
}
