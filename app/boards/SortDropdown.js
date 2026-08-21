"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./SortDropdown.module.css";

const OPTIONS = [{ value: "recent", label: "최신순" }];

export default function SortDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentValue = searchParams.get("orderBy") ?? "recent";
  const currentLabel =
    OPTIONS.find((option) => option.value === currentValue)?.label ?? "최신순";

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("orderBy", value);
    router.push(`/boards?${params.toString()}`);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{currentLabel}</span>
        <Image
          src="/images/icons/ic_arrow_down.svg"
          alt=""
          width={16}
          height={16}
          style={{ transform: isOpen ? "rotate(180deg)" : "none" }}
        />
      </button>

      {isOpen && (
        <ul className={styles.list}>
          {OPTIONS.map((option) => (
            <li key={option.value}>
              <button type="button" onClick={() => handleSelect(option.value)}>
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}