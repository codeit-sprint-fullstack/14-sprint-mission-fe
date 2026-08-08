import backIcon from "@/assets/ic_back.png";
import Image from "next/image";
import Link from "next/link";
import styles from "./BackLink.module.css";

export default function BackLink() {
  return (
    <Link href="/articles" className={styles.wrapper}>
      <p>목록으로 돌아가기</p>
      <Image src={backIcon} width={24} height={24} loading="eager" alt="" />
    </Link>
  );
}
