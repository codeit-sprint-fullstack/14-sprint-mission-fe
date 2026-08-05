import Button from "@/components/Button/Button";
import styles from "../status.module.css";
import Image from "next/image";

export default function BoardDetailNotFound() {
  return (
    <div className={styles.container}>
      <p>존재하지 않는 게시글입니다.</p>

      <div className={styles.backButton}>
        <Button href="/boards" className={styles.backButtonContent}>
          목록으로 돌아가기
          <Image src="/images/ic_back.svg" alt="" width={24} height={24} />
        </Button>
      </div>
    </div>
  );
}
