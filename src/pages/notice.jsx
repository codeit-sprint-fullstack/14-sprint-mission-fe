import Link from 'next/link';
import { useEffect, useState } from "react";
import styles from '@/styles/notice.module.css';
import Gnb from '../components/gnb.jsx';
import Dropdown from '@/components/dropdown.jsx';
import Bestpostcard from '@/components/bestpostcard.jsx';

export default function Notice() {
  const [bestPosts, setBestPosts] = useState([]);
  const [limit, setLimit] = useState(3);

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      if (width >= 1200) {
        setLimit(3);
      } else if (width >= 744) {
        setLimit(2);
      } else {
        setLimit(1);
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    async function fetchBestPosts() {
      try {
        const res = await fetch(`/api/notice?page=1&limit=${limit}&sort=likes`);
        const data = await res.json();
        setBestPosts(data.data);
      } catch (error) {
        console.error("Failed to fetch best posts:", error);
      }
    }
    fetchBestPosts();
  }, [limit]);

  return (
    <>
      <Gnb />
      <main>
        <div className={styles.wrap}>
          <div className={styles.content_wrap}>
            <div className={styles.bestpost}>
              <span>베스트 게시글</span>
               <div className={styles.bestpost_wrap}>
                {bestPosts.map((post) => (
                  <Bestpostcard
                    title={post.title}
                    author={post.author}
                    likes={post.likes}
                    date={post.postedAt}
                  />
                ))}
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