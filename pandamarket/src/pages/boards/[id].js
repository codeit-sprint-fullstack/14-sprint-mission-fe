import { useRouter } from 'next/router';
import axios from '@/lib/axios';
import Link from 'next/link';
import { formatDate } from '@/lib/formatDate';

export async function getServerSideProps(context) {
  const { id } = context.params;

  const res = await axios.get(`http://localhost:3000/article/${id}`);

  return {
    props: {
      article: res.data,
    },
  };
}

export default function BoardDetail({ article }) {
  const router = useRouter();

  async function handleDelete() {
    await axios.delete(`http://localhost:3000/article/${article.id}`);
    router.push('/boards');
  }

  return (
    <div>
      <Link href="/boards">← 목록으로 돌아가기</Link>
      <h1>{article.title}</h1>
      <p>{article.content}</p>
      <p>{formatDate(article.createdAt)}</p>
      <button onClick={handleDelete}>삭제</button>
      <button onClick={() => router.push(`/boards/edit/${article.id}`)}>수정</button>
    </div>
  );
}