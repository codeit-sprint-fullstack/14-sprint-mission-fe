'use server';

import { redirect } from "next/navigation";

export async function createProduct(formData) {
  // 제출된 폼에서 정보 가져오기
  const name = formData.get('name');
  const description = formData.get('description');
  const price = Number(formData.get('price'));
  const tags = formData.getAll('tags'); // ai로 해결: 태그 등록 구조를 고려한 input type='hidden' + getAll

  // 상품 생성 API 요청
  const res = await fetch(`${process.env.API_BASE_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, description, price, tags })
  });

  if (!res.ok) {
    throw new Error('상품 등록에 실패했습니다');
  }

  // 생성된 상품의 상세 페이지로 이동
  const product = await res.json();
  redirect(`/products/${product.id}`);
}