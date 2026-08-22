"use client";

import Image from "next/image";
import Link from "next/link";
import kebabIc from "@/public/ic_kebab.png";
import styles from "./KebabMenu.module.css";
import { useState } from "react";
import Modal from "./Modal";

export default function KebabMenu({
  confirmMessage,
  onEdit,
  onDelete,
  editHref,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => setIsOpen(!isOpen);

  return (
    <>
      {isModalOpen && (
        <Modal
          message={confirmMessage}
          onConfirm={() => {
            onDelete();
            setIsModalOpen(false);
          }}
          onCancel={() => setIsModalOpen(false)}
          confirmLabel="삭제"
        />
      )}
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
            <li>
              <button type="button" onClick={() => setIsModalOpen(true)}>
                삭제하기
              </button>
            </li>
          </ul>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
