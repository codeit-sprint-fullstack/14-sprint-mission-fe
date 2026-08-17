import Link from 'next/link';
import { useEffect, useState } from "react";
import styles from '@/styles/notice.module.css';
import Gnb from '../components/gnb.jsx';
import Pagination from '@/components/Pagination.jsx';
import Dropdown from '@/components/dropdown.jsx';
import Bestpostcard from '@/components/bestpostcard.jsx';
import Postcard from '@/components/postcard.jsx';
import Footer from "@/components/Footer.jsx";
import { formatDate } from '@/utils/time.js';

export default function Notice() {
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [bestPosts, setBestPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [orderBy, setOrderBy] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [keyword, setKeyword] = useState("");

  const getInitialPageSize = () => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      if (width >= 1200) return 3;
      if (width >= 744) return 2;
      return 1;
    }
    return 0; // SSR 환경에서는 기본값
  };
  const [pageSize, setPageSize] = useState(getInitialPageSize());

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      if (width >= 1200) {
        setPageSize(3);
      } else if (width >= 744) {
        setPageSize(2);
      } else {
        setPageSize(1);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    async function fetchBestPosts() {
      try {
        const res = await fetch(`/api/notice?page=1&pageSize=${pageSize}&orderBy=like`);
        const data = await res.json();
        setBestPosts(data.data);
      } catch (error) {
        console.error("Failed to fetch best posts:", error);
      }
    }
    fetchBestPosts();
  }, [pageSize]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(
          `/api/notice?page=${currentPage}&pageSize=5&orderBy=${orderBy}&keyword=${keyword}`
        );
        const data = await res.json();
        setPosts(data.data);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    }
    fetchPosts();
  }, [currentPage, orderBy, keyword]);

  useEffect(() => {
    async function fetchBestPosts() {
      try {
        const res = await fetch(
          `/api/notice?page=1&pageSize=${pageSize}&orderBy=like`
        );
        const data = await res.json();

        // ✅ 응답 구조에 맞게 list를 상태에 저장
        setBestPosts(data.list);
      } catch (error) {
        console.error("Failed to fetch best posts:", error);
      }
    }
    fetchBestPosts();
  }, [pageSize]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(
          `/api/notice?page=${currentPage}&pageSize=5&orderBy=${orderBy}&keyword=${keyword}`
        );
        const data = await res.json();

        // ✅ 게시글 리스트와 페이지 계산
        setPosts(data.list);
        setTotalPages(Math.ceil(data.totalCount / 5));
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    }
    fetchPosts();
  }, [currentPage, orderBy, keyword]);

  return (
    <>
      <Gnb />
      <main>
        <div className={styles.wrap}>
          <div className={styles.content_wrap}>
            <div className={styles.bestpost}>
              <span>베스트 게시글</span>
              <div className={styles.bestpost_wrap}>
                {Array.isArray(bestPosts) && bestPosts.map((post) => (
                  <Bestpostcard
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    author={post.writer.nickname}
                    likes={post.likeCount}
                    date={formatDate(post.createdAt)}
                  />
                ))}
              </div>
            </div>

            <div className={styles.postlist}>
              <div className={styles.postlist_head}>
                <span>게시글</span>
                <Link href="/notice/create">
                  <button>
                    <span>글쓰기</span>
                  </button>
                </Link>
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
                        setCurrentPage(1);
                      }}
                    />
                  </div>
                  <Dropdown
                    size="medium"
                    options={["최신순", "좋아요순"]}
                    onChange={(value) => {
                      const sortKey = value === "최신순" ? "recent" : "like";
                      setOrderBy(sortKey);
                      setCurrentPage(1);
                    }}
                  />
                </div>
                {Array.isArray(posts) && posts.map((post) => (
                  <Postcard
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    author={post.writer.nickname}
                    likes={post.likeCount}
                    date={formatDate(post.createdAt)}
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
