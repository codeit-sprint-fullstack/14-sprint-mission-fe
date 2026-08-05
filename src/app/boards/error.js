"use client";

import Button from "@/components/Button/Button";
import styles from "./status.module.css";
import Image from "next/image";

export default function BoardsError() {
  return (
    <div className={styles.container}>
      <p>게시글 목록을 불러오지 못했습니다.</p>

      <div className={styles.backButton}>
        <Button href="/" className={styles.backButtonContent}>
          홈으로 돌아가기
          <Image src="/images/ic_back.svg" alt="" width={24} height={24} />
        </Button>
      </div>
    </div>
  );
}
