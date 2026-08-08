// !! 기존 내용을 미리 채워두기
import { useRouter } from 'next/router';
import axios from '@/lib/axios';
import ArticleForm from '@/components/ArticleForm';

export async function getServerSideProps(context) {
  const { id } = context.params;

  const res = await axios.get(`http://localhost:3000/article/${id}`);

  return {
    props: {
      article: res.data,
    },
  };
}

export default function BoardEdit({ article }) {
  const router = useRouter();

  async function handleSubmit({ title, content }) {
    await axios.patch(`/article/${article.id}`, { title, content });
    router.push(`/boards/${article.id}`);
  }

  return (
    <div>
      <Link href={`/boards/${article.id}`}>← 뒤로가기</Link>
      <h1>게시글 수정</h1>
      <ArticleForm
        initialTitle={article.title}
        initialContent={article.content}
        onSubmit={handleSubmit}
        submitLabel="수정"
      />
    </div>
  );
}