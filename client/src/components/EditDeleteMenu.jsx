"use client";

import kebabIcon from "@/assets/ic_kebab.png";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./EditDeleteMenu.module.css";

export default function EditDeleteMenu({ editHref, onEdit, onDelete }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.menuBtn}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Image
          src={kebabIcon}
          width={24}
          height={24}
          loading="eager"
          alt="수정 및 삭제 메뉴"
        />
      </button>

      {isOpen && (
        <ul className={styles.menu}>
          <li>
            {editHref ? (
              <Link
                href={editHref}
                className={`${styles.listBtn} ${styles.editLink}`}
                onClick={() => setIsOpen(false)}
              >
                수정하기
              </Link>
            ) : (
              <button
                className={styles.listBtn}
                type="button"
                onClick={() => {
                  onEdit?.();
                  setIsOpen(false);
                }}
              >
                수정하기
              </button>
            )}
          </li>
          <li>
            <button
              className={styles.listBtn}
              type="button"
              onClick={() => {
                onDelete?.();
                setIsOpen(false);
              }}
            >
              삭제하기
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
