import Link from 'next/link';
import styles from '@/styles/notice.module.css';
import Gnb from '../components/gnb.jsx';
import Dropdown from '@/components/dropdown.jsx';

export default function Notice() {
  return (
    <>
      <Gnb />
      <main>
        <div className={styles.wrap}>
          <div className={styles.content_wrap}>
            <div className={styles.bestpost}>
              <span>베스트 게시글</span>
              <div className={styles.bestpost_wrap}>
                <p>게시글1</p>
                <p>게시글2</p>
                <p>게시글3</p>
              </div>
            </div>
            <div className={styles.postlist}>
              <div className={styles.postlist_head}>
                <span>게시글</span>
                <button>
                  <span>글쓰기</span>
                </button>
              </div>
              <div className={styles.postlist_content}>
                <div className={styles.search_wrap}>
                  <input type="text" placeholder="이름을 입력하세요" />
                  <Dropdown size={"medium"} options={["최신순", "좋아요순"]} onChange={(value) => console.log(value)} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}