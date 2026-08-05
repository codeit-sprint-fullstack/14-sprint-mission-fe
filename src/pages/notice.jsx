import { useEffect, useState } from "react";
import styles from '@/styles/notice.module.css';
import Gnb from '../components/gnb.jsx';
import Pagination from '@/components/Pagination.jsx';
import Dropdown from '@/components/dropdown.jsx';
import Bestpostcard from '@/components/bestpostcard.jsx';
import Postcard from '@/components/postcard.jsx';
import Footer from "@/components/Footer.jsx";

export default function Notice() {
  const [bestPosts, setBestPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [limit, setLimit] = useState(3);
  const [sort, setSort] = useState("date");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [keyword, setKeyword] = useState("");

  // 화면 크기에 따라 limit 조정
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

  // 베스트 게시글
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

  // 일반 게시글 (검색/정렬/페이지네이션 반영)
  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(
          `/api/notice?page=${currentPage}&limit=5&sort=${sort}&keyword=${keyword}`
        );
        const data = await res.json();
        setPosts(data.data);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    }
    fetchPosts();
  }, [currentPage, sort, keyword]);

  return (
    <>
      <Gnb />
      <main>
        <div className={styles.wrap}>
          <div className={styles.content_wrap}>
            {/* 베스트 게시글 */}
            <div className={styles.bestpost}>
              <span>베스트 게시글</span>
              <div className={styles.bestpost_wrap}>
                {bestPosts.map((post) => (
                  <Bestpostcard
                    key={post.id}
                    title={post.title}
                    author={post.author}
                    likes={post.likes}
                    date={post.postedAt}
                  />
                ))}
              </div>
            </div>

            {/* 게시글 리스트 */}
            <div className={styles.postlist}>
              <div className={styles.postlist_head}>
                <span>게시글</span>
                <button>
                  <span>글쓰기</span>
                </button>
              </div>
              <div className={styles.postlist_content}>
                <div className={styles.search_wrap}>
                  <div className={styles.input_wrap}>
                    <img src="/assets/ic_search.svg" alt="검색" className={styles.icon}/>
                    <input
                      type="text"
                      placeholder="검색할 상품을 입력해주세요"
                      value={keyword}
                      onChange={(e) => {
                        setKeyword(e.target.value);
                        setCurrentPage(1); // 검색어 바뀌면 첫 페이지로 이동
                      }}
                    />
                  </div>
                  <Dropdown
                    size="medium"
                    options={["최신순", "좋아요순"]}
                    onChange={(value) => {
                      const sortKey = value === "최신순" ? "date" : "likes";
                      setSort(sortKey);
                      setCurrentPage(1);
                    }}
                  />
                </div>

                {posts.map((post) => (
                  <Postcard
                    key={post.id}
                    title={post.title}
                    author={post.author}
                    likes={post.likes}
                    date={post.postedAt}
                  />
                ))}

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
