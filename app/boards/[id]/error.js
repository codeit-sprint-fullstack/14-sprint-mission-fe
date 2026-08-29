"use client";

import { useEffect } from "react";
import styles from "./detail.module.css";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={`wrapper ${styles.errorBox}`}>
      <p>게시글을 불러오지 못했어요.</p>
      <button className={styles.retryButton} onClick={reset}>
        다시 시도
      </button>
    </div>
  );
}