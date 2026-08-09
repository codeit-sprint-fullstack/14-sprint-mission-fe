import { useState } from "react";
import styles from "@/styles/SortDropDown.module.css";

export default function SortDropDown({ orderBy, setOrderBy }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.dropDownWrap}>
      <button
        type="button"
        className={`${styles.btnDropDown} ${isOpen ? styles.open : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {orderBy === "favorite" ? "좋아요순" : "최신순"}
      </button>

      {isOpen && (
        <ul className={styles.sortList}>
          <li
            onClick={() => {
              setOrderBy("recent");
              setIsOpen(false);
            }}
          >
            최신순
          </li>

          <li
            onClick={() => {
              setOrderBy("favorite");
              setIsOpen(false);
            }}
          >
            좋아요순
          </li>
        </ul>
      )}
    </div>
  );
}