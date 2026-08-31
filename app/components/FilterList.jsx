"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import arrowDownIc from "@/public/icon_arrow_down.png";
import Image from "next/image";
import styles from "./FilterList.module.css";
import { parseEnum } from "../lib/validation";
import { useState } from "react";

const ORDER_LABELS = { recent: "최신순", favorite: "좋아요 순" };
export default function FilterList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const orderBy =
    parseEnum(searchParams.get("orderBy"), {
      allowed: ["recent", "favorite"],
      defaultValue: "recent",
    }) ?? "recent";
  const [isOpen, setIsOpen] = useState(false);

  function handleFilter(sort) {
    const params = new URLSearchParams(searchParams);
    params.set("orderBy", sort);
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);

    setIsOpen(false);
  }

  const handleClick = () => setIsOpen(!isOpen);

  return (
    <div className={styles.filterArea}>
      <button className={styles.filter} type="button" onClick={handleClick}>
        {ORDER_LABELS[orderBy] ?? ORDER_LABELS.recent}
        <Image src={arrowDownIc} alt="" width={24} />
      </button>
      {isOpen && (
        <ul className={styles.list}>
          <li>
            <button onClick={() => handleFilter("recent")}>최신순</button>
          </li>
          <li>
            <button onClick={() => handleFilter("favorite")}>좋아요 순</button>
          </li>
        </ul>
      )}
    </div>
  );
}
