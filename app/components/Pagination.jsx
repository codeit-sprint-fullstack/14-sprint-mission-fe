"use client";

import { useSearchParams } from "next/navigation";
import styles from "./Pagination.module.css";
import { useRouter } from "next/navigation";
import { parseNumberParam } from "../lib/validation";

export default function Pagination({ totalCount }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageSize = parseNumberParam(searchParams.get("pageSize"), 10);
  const page = parseNumberParam(searchParams.get("page"), 1);
  const totalPage = Math.ceil(totalCount / pageSize);

  function paginationSetting() {
    const pageGroupSize = 5;
    const half = Math.floor(pageGroupSize / 2);
    let start = Math.max(page - half, 1);
    let end = Math.min(start + pageGroupSize - 1, totalPage);

    if (end - start + 1 < pageGroupSize) {
      start = end - pageGroupSize + 1;
    }
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }
  const pageNumbers = paginationSetting();

  function handlePagination(page) {
    const params = new URLSearchParams(searchParams);
    params.set("page", page);
    router.push(`/items?${params.toString()}`);
  }
  return (
    <>
      <ul className={styles.pagination}>
        <li>
          <button
            onClick={() => handlePagination(page - 1)}
            disabled={page < 2}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M9.5 4.66669L6 8.16669L9.5 11.6667"
                stroke="#4B5563"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={number === page ? `${styles.active}` : ""}
          >
            <button
              onClick={() => handlePagination(number)}
              disabled={number === page}
            >
              {number}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => handlePagination(page + 1)}
            disabled={page === totalPage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M6 4.66656L9.5 8.16656L6 11.6666"
                stroke="#4B5563"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </li>
      </ul>
    </>
  );
}
