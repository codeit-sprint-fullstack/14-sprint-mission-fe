"use client";

import styles from "./page.module.css";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function ActionMenu({ editContent, deleteAction }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  function handleToggle() {
    setIsOpen((previousValue) => !previousValue);
  }

  function handleDelete(e) {
    const isConfirmed = window.confirm("정말 삭제하시겠습니까?");

    if (!isConfirmed) {
      e.preventDefault();
    }
  }

  useEffect(() => {
    function handleOutsideClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handleOutsideClick);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
    };
  }, []);

  return (
    <div className={styles.actionMenuWrapper} ref={menuRef}>
      <button
        className={styles.moreButton}
        type="button"
        onClick={handleToggle}
      >
        <Image src="/icons/ic_kebab.svg" alt="" width={24} height={24} />
      </button>
      {isOpen && (
        <div className={styles.actionMenu}>
          <Link
            className={styles.actionItem}
            href={editContent}
            onClick={() => setIsOpen(false)}
          >
            수정하기
          </Link>

          <form action={deleteAction} onSubmit={handleDelete}>
            <button className={styles.actionItem} type="submit">
              삭제하기
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
