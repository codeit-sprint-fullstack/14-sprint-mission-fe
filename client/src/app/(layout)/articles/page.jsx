'use client';

import Dropdown from '@/components/Dropdown';
import Pagination from '@/components/Pagination';
import Input from '@/components/SearchInput';
import { useGetArticles } from '@/queries/articles';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import ArticleList from './_components/ArticleList';
import BestArticleList from './_components/BestArticleList';
import styles from './page.module.css';

export default function Articles() {
  const pageSize = 4;
  // searchParams로 url의 쿼리스트링 꺼내기
  const params = useSearchParams();
   const page = Number(params.get('page') ?? 1);
  const keyword = params.get('keyword') ?? '';
  const orderBy = params.get('orderBy') ?? 'recent';

  // 베스트 게시글 가져오기
  const { 
    data: bestData, 
    isPending: isBestPending,
    isError: isBestError,
    error: bestError,
  } = useGetArticles({ 
    page: 1,
    pageSize: 3, 
    orderBy:'like', 
    keyword: '', 
  });

  // 일반 게시글 가져오기
  const { 
    data, 
    isPending, 
    isError, 
    error 
  } = useGetArticles({
    page,
    pageSize,
    orderBy,
    keyword,
  });

  if (isPending || isBestPending) return <p>로딩 중...</p>;
  if (isError || isBestError) return <p>게시글을 불러오지 못했습니다: {error?.message ?? bestError?.message}</p>;

  const articles = data.articles;
  const bestArticles = bestData.articles;
  const totalCount = data.totalCount;
  
  // 페이지네이션
  const totalPages = Math.ceil(totalCount / pageSize); // 필요한 총 페이지 수 구하기
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1); // 페이지 배열 만들기 (1, 2... N)

  return (
    <div className={styles.pageWrapper}>

      <header className={styles.section}>
        <h1 className={styles.bestSectionTitle}>베스트 게시글</h1>
        <BestArticleList articles={bestArticles} />
      </header>

      <section className={styles.section}>
        <div className={styles.articleSectionHeader}>
          <h2 className={styles.articleSectionTitle}>게시글</h2>
          <Link href="/articles/new" className={styles.createArticleLink}>
            글쓰기
          </Link>
        </div>
        <div className={styles.controllers}>
          <Input placeholder="검색어를 입력해주세요" route="/articles" />
          <Dropdown route="/articles" />
        </div>
        <ArticleList articles={articles} />
        <div>
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            pageNumbers={pageNumbers}
            route='articles'
          />
        </div>
      </section>

    </div>
  );
}
