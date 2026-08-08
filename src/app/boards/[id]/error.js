"use client";

import Image from "next/image";
import styles from "../status.module.css";
import Button from "@/components/Button/Button";

export default function BoardDetailError() {
  return (
    <div className={styles.container}>
      <p>게시글을 불러오지 못했습니다.</p>

      <div className={styles.backButton}>
        <Button href="/boards" className={styles.backButtonContent}>
          목록으로 돌아가기
          <Image src="/images/ic_back.svg" alt="" width={24} height={24} />
        </Button>
      </div>
    </div>
  );
}
