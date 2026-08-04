import ArticleList from '@/components/ArticleList';
import Dropdown from '@/components/Dropdown';
import Input from '@/components/SearchInput';

export default async function Articles() {
  // 베스트 게시글 가져오기
  const bestRes = await fetch(`${process.env.API_BASE_URL}/articles?limit=3&sort=recent`,
    {cache: 'no-store'}
  );
  const bestData = await bestRes.json();
  const bestArticles = bestData.list;

  // 일반 게시글 가져오기
  const res = await fetch(`${process.env.API_BASE_URL}/articles`,
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
        <Input placeholder='검색할 상품을 입력해주세요'/>
        <Dropdown />
        <ArticleList articles={articles}/>
      </section>
    </div>
  )
}