"use client";

import Image from "next/image";
import Link from "next/link";
import kebabIc from "@/public/ic_kebab.png";
import styles from "./KebabMenu.module.css";
import { useState } from "react";

export default function KebabMenu({
  confirmMessage,
  onEdit,
  onDelete,
  editHref,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => setIsOpen(!isOpen);

  function handleDelete() {
    if (confirmMessage && !window.confirm(confirmMessage)) return;
    onDelete();
  }

  return (
    <div className={styles.kebabMenuArea}>
      <button
        type="button"
        className={styles.kebabBt}
        onClick={() => handleClick()}
      >
        <Image src={kebabIc} width={24} height={24} alt="" />
      </button>
      {isOpen ? (
        <ul className={styles.list}>
          <li>
            {editHref ? (
              <Link href={editHref}>
                <button type="button">수정하기</button>
              </Link>
            ) : (
              <button type="button" onClick={onEdit}>
                수정하기
              </button>
            )}
          </li>
          <li onClick={handleDelete}>삭제하기</li>
        </ul>
      ) : (
        ""
      )}
    </div>
  );
}
