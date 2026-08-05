'use server';

import { revalidatePath } from 'next/cache';

// 댓글 생성
export async function createComment(articleId, formData) {
  // 제출된 폼에서 내용 가져오기
  const content = formData.get('content');

  // 댓글 생성 API 요청
  const res = await fetch(`${process.env.API_BASE_URL}/articles/${articleId}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  });

  if (!res.ok) {
    throw new Error('댓글 작성에 실패했습니다');
  }

  // 해당 게시글 페이지의 캐시 무효화
  revalidatePath(`/articles/${articleId}`);
}