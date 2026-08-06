'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createArticle } from '@/lib/external-api';

const MAX_IMAGE_DATA_LENGTH = 3 * 1024 * 1024;

export async function createArticleAction(previousState, formData) {
  void previousState;

  const image = String(formData.get('image') || '');
  if (image.length > MAX_IMAGE_DATA_LENGTH) {
    return { error: '이미지는 2MB 이하로 등록해주세요.' };
  }

  let article;
  try {
    article = await createArticle({
      title: formData.get('title'),
      content: formData.get('content'),
      image: image || null,
    });
  } catch (error) {
    console.error(error);
    return {
      error: error.message || '게시글 등록에 실패했습니다.',
    };
  }

  revalidatePath('/free-board');
  redirect(`/free-board/${article.id}`);
}
