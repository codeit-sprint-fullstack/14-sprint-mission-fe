'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createProduct } from '@/lib/external-api';

const MAX_IMAGE_DATA_LENGTH = 3 * 1024 * 1024;

export async function createProductAction(previousState, formData) {
  void previousState;

  const image = String(formData.get('image') || '');
  if (image.length > MAX_IMAGE_DATA_LENGTH) {
    return { error: '이미지는 2MB 이하로 등록해주세요.' };
  }

  let product;
  try {
    product = await createProduct({
      name: formData.get('name'),
      description: formData.get('description'),
      price: formData.get('price'),
      tags: formData.getAll('tags'),
      image: image || null,
    });
  } catch (error) {
    console.error(error);
    return {
      error: error.message || '상품 등록에 실패했습니다.',
    };
  }

  revalidatePath('/items');
  redirect(`/items/${product.id}`);
}
