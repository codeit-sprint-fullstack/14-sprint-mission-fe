"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ActionDropdown.module.css";

export default function ActionDropdown({ onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.dropdownWrapper} ref={wrapperRef}>
      <button
        type="button"
        className={styles.dropdownTrigger}
        onClick={() => setOpen((prev) => !prev)}
        aria-label="더보기"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="5" r="1.6" fill="#9CA3AF" />
          <circle cx="12" cy="12" r="1.6" fill="#9CA3AF" />
          <circle cx="12" cy="19" r="1.6" fill="#9CA3AF" />
        </svg>
      </button>

      {open && (
        <div className={styles.dropdownMenu}>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onEdit?.();
            }}
          >
            수정하기
          </button>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onDelete?.();
            }}
          >
            삭제하기
          </button>
        </div>
      )}
    </div>
  );
}