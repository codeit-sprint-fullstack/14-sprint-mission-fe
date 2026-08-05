import Link from 'next/link';
import ArticleList from '@/components/article/ArticleList';
import BestArticleList from '@/components/article/BestArticleList';
import Dropdown from '@/components/Dropdown';
import Input from '@/components/SearchInput';
import styles from './page.module.css';

export default async function Articles({ searchParams }) {
  // 베스트 게시글 가져오기
  const bestRes = await fetch(`${process.env.API_BASE_URL}/articles?limit=3&sort=recent`,
    {cache: 'no-store'}
  );
  if (!bestRes.ok) {
    throw new Error('게시글을 불러오는 데 실패했습니다');
  }
  const bestData = await bestRes.json();
  const bestArticles = bestData.list;

  // searchParams로 url의 keyword, sort 꺼내기
  const params = await searchParams;
  const keyword = params.keyword ?? '';
  const sort = params.sort ?? 'recent';

  // 일반 게시글 가져오기
  const res = await fetch(`${process.env.API_BASE_URL}/articles?limit=4&keyword=${keyword}&sort=${sort}`,
    {cache: 'no-store'}
  );
  if (!res.ok) {
    throw new Error('게시글을 불러오는 데 실패했습니다');
  }
  const data = await res.json();
  const articles = data.list;

  return (
    <div className={styles.pageWrapper}>
      <section className={styles.section}>
        <h1 className={styles.bestSectionTitle}>
          베스트 게시글
        </h1>
        <BestArticleList articles={bestArticles} />
      </section>
      <section className={styles.section}>
        <div className={styles.articleSectionHeader}>
          <h2 className={styles.articleSectionTitle}>
            게시글
          </h2>
          <Link href='/articles/new' className={styles.createArticleLink}>
            글쓰기
          </Link>
        </div>
        <div className={styles.controllers}>
          <Input placeholder='검색어를 입력해주세요'/>
          <Dropdown />
        </div>
        <ArticleList articles={articles}/>
      </section>
    </div>
  )
}