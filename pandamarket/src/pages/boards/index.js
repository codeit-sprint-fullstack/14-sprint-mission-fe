import styles from './index.module.css';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from '@/lib/axios';
import { formatDate } from '@/lib/formatDate';

// 서버에 없는 값들은 프론트에서 대충 채운다
const DUMMY_IMAGE = '/images/default-thumbnail.png';
function getDummyNickname() {
  return '익명' + Math.floor(Math.random() * 1000);
}
function getDummyLikes() {
  return Math.floor(Math.random() * 100);
}

export default function BoardList() {
  const [articles, setArticles] = useState([]);
  const [bestArticles, setBestArticles] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [sort, setSort] = useState('recent');

  // 베스트 게시글 3개 (최신순 고정)
  useEffect(() => {
    async function fetchBest() {
      const res = await axios.get('/article', {
        params: { sort: 'recent', page: 1, pageSize: 3 },
      });
      setBestArticles(res.data.pageList);
    }
    fetchBest();
  }, []);

  // 전체 목록 (정렬/검색 바뀔 때마다 다시 요청)
  useEffect(() => {
    async function fetchList() {
      const res = await axios.get('/article', {
        params: { sort, keyword, page: 1, pageSize: 10 },
      });
      setArticles(res.data.pageList);
    }
    fetchList();
  }, [sort, keyword]);

  return (
    <div className={styles.container}>
      <h2>베스트 게시글</h2>
      <ul className={styles.bestList}>
        {bestArticles.map((article) => (
          <li key={article.id} className={styles.bestItem}>
            <Link href={`/boards/${article.id}`}>
              <span className={styles.bestBadge}>🏆 Best</span>
              <p className={styles.bestTitle}>{article.title}</p>
            </Link>
          </li>
        ))}
      </ul>

      <h2>전체 게시글</h2>

      <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="recent">최신순</option>
      </select>

      <input
        placeholder="검색어를 입력해주세요"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button><Link href="/boards/write">글쓰기</Link></button>
      <ul className={styles.articleList}>
        {articles.map((article) => (
          <li key={article.id} className={styles.articleItem}>
            <Link href={`/boards/${article.id}`}>
              <div>
                <p className={styles.articleTitle}>{article.title}</p>
                <div className={styles.articleMeta}>
                  <span>{getDummyNickname()}</span>
                  <span>{formatDate(article.createdAt)}</span>
                  <span>♡ {getDummyLikes()}</span>
                </div>
              </div>
              <img className={styles.thumbnail} src={DUMMY_IMAGE} alt="" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}