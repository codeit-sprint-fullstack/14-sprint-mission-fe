import ArticleList from '@/components/ArticleList';
import Dropdown from '@/components/Dropdown';
import Input from '@/components/SearchInput';

export default async function Articles({ searchParams }) {
  // 베스트 게시글 가져오기
  const bestRes = await fetch(`${process.env.API_BASE_URL}/articles?limit=3&sort=recent`,
    {cache: 'no-store'}
  );
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
  const data = await res.json();
  const articles = data.list;

  return (
    <div>
      <section>
        <h1>베스트 게시글</h1>
        <ArticleList articles={bestArticles} />
      </section>
      <section>
        <h2>게시글</h2>
        <Input placeholder='검색어를 입력해주세요'/>
        <Dropdown />
        <ArticleList articles={articles}/>
      </section>
    </div>
  )
}