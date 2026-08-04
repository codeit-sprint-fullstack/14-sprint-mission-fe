"use client";

import { useState } from "react";
import styles from "./Dropdown.module.css";
import Image from "next/image";

export default function Dropdown({
  options,
  defaultValue,
  variant = "select",
  onChange,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const selectedOption = options.find(
    (option) => option.value === selectedValue,
  );

  const handleSelect = (option) => {
    setSelectedValue(option.value);
    setIsOpen(false);
    onChange?.(option.value);
  };

  return (
    <div className={styles.dropdown}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {variant === "select" ? (
          <>
            <span className={styles.selectedLabel}>
              {selectedOption?.label}
            </span>

            <Image
              src="/images/ic_arrow_down.svg"
              alt=""
              width={24}
              height={24}
              className={styles.arrowIcon}
            />

            <Image
              src="/images/ic_sort.svg"
              alt="정렬"
              width={24}
              height={24}
              className={styles.sortIcon}
            />
          </>
        ) : (
          <Image
            src="/images/ic_kebab.svg"
            alt="메뉴 열기"
            width={24}
            height={24}
          />
        )}
      </button>

      {isOpen && (
        <ul className={styles.menu}>
          {options.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                className={styles.option}
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
