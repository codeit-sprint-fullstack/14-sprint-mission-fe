import ArticleBoard from '@/components/ArticleBoard';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: '자유게시판',
  description: '판다마켓 사용자들과 자유롭게 이야기를 나눠보세요.',
};

function toSingleValue(value) {
  return Array.isArray(value) ? value[0] : value;
}

function parsePage(value) {
  const parsed = Number(toSingleValue(value));
  return Number.isInteger(parsed) && parsed > 0 ? parsed : 1;
}

export default async function ArticleListPage({ searchParams }) {
  const filters = await searchParams;
  const page = parsePage(filters.page);
  const keyword = String(toSingleValue(filters.q) || '').trim();
  const requestedOrder = String(toSingleValue(filters.orderBy) || 'recent');
  const orderBy = ['recent', 'like'].includes(requestedOrder) ? requestedOrder : 'recent';
  const notice = toSingleValue(filters.notice) === 'deleted' ? '게시글이 삭제되었습니다.' : '';

  return (
    <ArticleBoard
      initialKeyword={keyword}
      initialOrderBy={orderBy}
      initialPage={page}
      initialNotice={notice}
    />
  );
}
