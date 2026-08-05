'use client';

import { useState } from 'react';
import Link from 'next/link';
import useArticleList from '../../../models/useArticleList.js';
import BestArticleCard from '../../components/BestArticleCard';
import ArticleCard from '../../components/ArticleCard';
import SortDropdown from '../../components/SortDropdown';
import Pagination from '../../components/Pagination';
import Footer from '../../components/Footer';

const PAGE_SIZE = 10;
const BEST_COUNT = 3;

const SORT_OPTIONS = [{ value: 'recent', label: '최신순' }];

export default function BoardPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [orderBy, setOrderBy] = useState('recent');

  // 베스트 게시글: 최신순 3개 (검색어와 무관하게 항상 최신 기준)
  const { articles: bestArticles } = useArticleList(1, '', BEST_COUNT);

  const { articles, totalPages, loading, error } = useArticleList(currentPage, keyword, PAGE_SIZE);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setCurrentPage(1);
      setKeyword(searchInput);
    }
  };

  const handleSortChange = (value) => {
    setOrderBy(value);
    setCurrentPage(1);
  };

  return (
    <>
      <div className="main">
        <div className="inner">

          {/* 베스트 게시글 */}
          <section className="bestSection">
            <h2 className="sectionTitle">베스트 게시글</h2>
            <div className="bestGrid">
              {bestArticles.map((article) => (
                <BestArticleCard key={article.id} article={article} />
              ))}
            </div>
          </section>

          {/* 게시글 목록 */}
          <section className="articleSection">
            <div className="articleSectionHeader">
              <h2 className="sectionTitle">게시글</h2>
              <Link href="/board/registration" className="addItemBtn">글쓰기</Link>
            </div>

            <div className="articleToolbar">
              <input
                className="searchInput"
                type="text"
                placeholder="검색할 게시글을 입력해주세요"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleSearch}
              />

              <SortDropdown options={SORT_OPTIONS} value={orderBy} onChange={handleSortChange} />
            </div>

            {loading && <div className="articleStatus">로딩 중...</div>}

            {!loading && error && (
              <div className="articleStatus">게시글을 불러오지 못했습니다.</div>
            )}

            {!loading && !error && articles.length === 0 && (
              <div className="articleStatus">
                {keyword ? `'${keyword}' 검색 결과가 없습니다.` : '등록된 게시글이 없습니다.'}
              </div>
            )}

            {!loading && !error && articles.length > 0 && (
              <div className="articleList">
                {articles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            )}

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </section>

        </div>
      </div>

      <Footer />
    </>
  );
}
