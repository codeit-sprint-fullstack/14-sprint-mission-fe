import Link from "next/link";
import styles from "./detail.module.css";

export default function NotFound() {
  return (
    <div className={`wrapper ${styles.notFoundBox}`}>
      <p>존재하지 않는 게시글이에요.</p>
      <Link href="/boards" className={styles.backLink}>
        목록으로 돌아가기
      </Link>
    </div>
  );
}