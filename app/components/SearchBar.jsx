"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import searchIc from "@/public/icon_search.png";
import styles from "./SearchBar.module.css";
import Image from "next/image";

export default function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [keyword, setKeyword] = useState(searchParams.get("keyword") ?? "");

  function handleChange(e) {
    setKeyword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);

    params.set("page", "1");
    params.set("keyword", keyword);
    if (!keyword) {
      params.delete("keyword");
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className={styles.search}>
      <form onSubmit={handleSubmit}>
        <Image src={searchIc} alt="" width={24} height={24} />
        <input
          name="keyword"
          value={keyword}
          onChange={handleChange}
          placeholder="검색할 키워드를 입력해주세요"
        />
      </form>
    </div>
  );
}
