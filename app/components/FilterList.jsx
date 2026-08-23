"use client";

import { useRouter, useSearchParams } from "next/navigation";
import arrowDownIc from "@/public/icon_arrow_down.png";
import Image from "next/image";
import styles from "./FilterList.module.css";
import { useState } from "react";

const ORDER_LABELS = { recent: "최신순", oldest: "오래된 순" };
export default function FilterList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get("orderBy") ?? "recent";
  const [isOpen, setIsOpen] = useState(false);

  function handleFilter(sort) {
    const params = new URLSearchParams(searchParams);
    params.set("orderBy", sort);
    router.push(`/posts?${params.toString()}`);
    setIsOpen(false);
  }

  const handleClick = () => setIsOpen(!isOpen);

  return (
    <div className={styles.filterArea}>
      <button className={styles.filter} type="button" onClick={handleClick}>
        {ORDER_LABELS[current]}
        <Image src={arrowDownIc} alt="" width={24} />
      </button>
      {isOpen && (
        <ul className={styles.list}>
          <li>
            <button onClick={() => handleFilter("recent")}>최신순</button>
          </li>
          <li>
            <button onClick={() => handleFilter("oldest")}>오래된 순</button>
          </li>
        </ul>
      )}
    </div>
  );
}
