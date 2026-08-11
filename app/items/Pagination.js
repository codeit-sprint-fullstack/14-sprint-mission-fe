"use client";

import Link from "next/link";
import styles from "./items.module.css";

export default function Pagination({ page, totalCount, pageSize, orderBy, keyword }) {
  const totalPages = Math.ceil(totalCount / pageSize);

  const start = Math.floor((page - 1) / 5) * 5 + 1;
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p >= start && p < start + 5,
  );

  function buildHref(targetPage) {
    const params = new URLSearchParams({ page: String(targetPage), orderBy });
    if (keyword) params.set("keyword", keyword);
    return `/items?${params.toString()}`;
  }

  return (
    <div className={styles.pagenation}>
      <Link
        href={buildHref(page - 1)}
        className={`${styles.pageButton} ${page === 1 ? styles.disabled : ""}`}
      >
        &lt;
      </Link>

      {pageNumbers.map((p) => (
        <Link
          key={p}
          href={buildHref(p)}
          className={`${styles.pageButton} ${p === page ? styles.active : ""}`}
        >
          {p}
        </Link>
      ))}

      <Link
        href={buildHref(page + 1)}
        className={`${styles.pageButton} ${page === totalPages ? styles.disabled : ""}`}
      >
        &gt;
      </Link>
    </div>
  );
}