"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./Dropdown.module.css";

export default function Dropdown({
  options,
  value,
  defaultValue,
  variant = "select",
  onChange,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue);

  const isControlled = value !== undefined;
  const selectedValue = isControlled ? value : internalValue;

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedOption = options.find(
    (option) => option.value === selectedValue,
  );

  const handleSelect = (option) => {
    if (!isControlled) {
      setInternalValue(option.value);
    }

    setIsOpen(false);
    onChange?.(option.value);
  };

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button
        type="button"
        className={`${styles.trigger} ${
          variant === "menu" ? styles.menuTrigger : ""
        }`}
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
        <ul
          className={`${styles.menu} ${
            variant === "menu" ? styles.actionMenu : ""
          }`}
        >
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
