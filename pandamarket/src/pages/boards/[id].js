import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from '@/lib/axios';
import { formatDate } from '@/lib/formatDate';

export async function getServerSideProps(context) {
  const { id } = context.params;
  const res = await axios.get(`http://localhost:3000/article/${id}`);
  return { props: { article: res.data } };
}

export default function BoardDetail({ article }) {
  const router = useRouter();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingContent, setEditingContent] = useState('');

  // 댓글 목록 불러오기
  useEffect(() => {
    fetchComments();
  }, []);

  async function fetchComments() {
    const res = await axios.get(`/articles/${article.id}/comments`);
    console.log('댓글 응답 모양:', res.data);

    const list = Array.isArray(res.data) ? res.data : res.data.list ?? [];
    setComments(list);
  }

  async function handleDelete() {
    await axios.delete(`http://localhost:3000/article/${article.id}`);
    router.push('/boards');
  }

  // 댓글 등록
  async function handleAddComment(e) {
    e.preventDefault();
    await axios.post(`/articles/${article.id}/comments`, { content: newComment });
    setNewComment('');
    fetchComments();
  }

  // 댓글 수정 시작
  function startEdit(comment) {
    setEditingId(comment.id);
    setEditingContent(comment.content);
  }

  // 댓글 수정 저장
  async function handleEditSave(commentId) {
    await axios.patch(`/article-comments/${commentId}`, { content: editingContent });
    setEditingId(null);
    fetchComments();
  }

  // 댓글 삭제
  async function handleCommentDelete(commentId) {
    await axios.delete(`/article-comments/${commentId}`);
    fetchComments();
  }

  return (
    <div>
      <Link href="/boards">← 목록으로 돌아가기</Link>

      <h1>{article.title}</h1>
      <p>{formatDate(article.createdAt)}</p>
      <p>{article.content}</p>
      <button onClick={handleDelete}>삭제</button>
      <button onClick={() => router.push(`/boards/edit/${article.id}`)}>수정</button>

      <hr />

      <h2>댓글</h2>

      {/* 댓글 등록 폼 */}
      <form onSubmit={handleAddComment}>
        <input
          placeholder="댓글을 입력해주세요"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button type="submit" disabled={newComment.trim() === ''}>
          등록
        </button>
      </form>

      {/* 댓글 목록 */}
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            {editingId === comment.id ? (
              <>
                <input
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                />
                <button onClick={() => handleEditSave(comment.id)}>저장</button>
                <button onClick={() => setEditingId(null)}>취소</button>
              </>
            ) : (
              <>
                <p>{comment.content}</p>
                <button onClick={() => startEdit(comment)}>수정</button>
                <button onClick={() => handleCommentDelete(comment.id)}>삭제</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}