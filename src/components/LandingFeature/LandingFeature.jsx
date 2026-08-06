import Image from "next/image";
import styles from "./LandingFeature.module.css";

export default function LandingFeature({
  image,
  alt,
  keyword,
  title,
  description,
  reverse = false,
  last = false,
}) {
  const sectionClassName = `${styles.section} ${last ? styles.last : ""}`;
  const innerClassName = `${styles.inner} ${reverse ? styles.reverse : ""}`;
  const textClassName = `${styles.text} ${reverse ? styles.right : ""}`;

  return (
    <section className={sectionClassName}>
      <div className={innerClassName}>
        <div className={styles.image}>
          <Image src={image} alt={alt} width={588} height={444} />
        </div>

        <div className={textClassName}>
          <p className={styles.keyword}>{keyword}</p>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    </section>
  );
}
