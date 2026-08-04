import { createArticle } from "@/app/actions";
import styles from "./page.module.css";

export default function ArticleWrite() {
  return (
    <form action={createArticle}>
      <div className={styles.formHeader}>
        <h2>게시글 쓰기</h2>
        <button type="submit">등록</button>
      </div>
      <div>
        <label>*제목</label>
        <input
          className={styles.titleBox}
          id="title"
          name="title"
          type="text"
          placeholder="제목을 입력해주세요"
          required
        />
      </div>
      <div>
        <label>*내용</label>
        <textarea
          className={styles.contentBox}
          id="content"
          name="content"
          type="text"
          placeholder="내용을 입력해주세요"
          required
        />
      </div>
    </form>
  );
}
