import { useRouter } from 'next/router';
import axios from '@/lib/axios';
import ArticleForm from '@/components/ArticleForm';

export default function BoardWrite() {
  const router = useRouter();

  async function handleSubmit({ title, content }) {
    const res = await axios.post('/article', { title, content });
    router.push(`/boards/${res.data.id}`);
  }

  return (
    <div>
      <h1>게시글 등록</h1>
      <ArticleForm onSubmit={handleSubmit} submitLabel="등록" />
    </div>
  );
}