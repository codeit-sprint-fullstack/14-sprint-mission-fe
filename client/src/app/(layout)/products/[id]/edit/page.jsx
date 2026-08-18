'use client';

import Input from '@/components/form/Input';
import SubmitButton from '@/components/form/SubmitButton';
import TagInput from '@/components/form/TagInput';
import Textarea from '@/components/form/Textarea';
import { useUser } from '@/queries/auth';
import { useGetProduct, useUpdateProduct } from '@/queries/products';
import { useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './page.module.css';

export default function ProductEdit() {
  const params = useParams();
  const { id } = params;
  const router = useRouter();
  const queryClient = useQueryClient();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [tags, setTags] = useState([]);

  const isEmpty =
    name.trim() === '' ||
    description.trim() === '' ||
    price === '' ||
    tags.length === 0;

  // 로그인 유저 정보 가져오기
  const { 
    data: user, 
    isPending: isUserPending 
  } = useUser()

  // 수정할 상품 가져오기
  const { 
    data: product, 
    isPending: isProductPending ,
    isError: isProductError,
    error: productError
  } = useGetProduct(id, Boolean(user));

  // 상품 수정하기
  const updateProductMutation = useUpdateProduct();
  function handleSubmit(e) {
    e.preventDefault();

    const data = {
      name,
      description,
      price: Number(price),
      tags,
    };
    updateProductMutation.mutate({ productId: id, data},{
      // 성공하면
      onSuccess:() => {
        queryClient.invalidateQueries({ queryKey: ['product'] }); // 캐시 무효화
        router.push(`/products/${id}`); // 상품 상세 페이지로 이동
      },
      // 실패하면
      onError: (err) => {
        console.error('상품 수정 실패: ', err.response?.data?.message);
        alert('상품 수정에 실패했습니다');
      }
    })
  }

  useEffect(() => {
    if (!product || !user) return;

    // 접근 권한이 없는 경우, 상품 상세페이지로 이동
    if (product.ownerId !== user.id) {
      router.replace(`/products/${id}`);
      return;
    }
    // form input value에 미리 채워넣기
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
    setTags(product.tags);
  }, [product, user, id, router]);

  if (isUserPending) return <p>사용자 인증 확인 중...</p>
  if (isProductPending) return <p>상품 정보 로딩 중...</p>
  if (isProductError) return <p>{productError.message}</p>
  if (product.ownerId !== user.id) return <p>접근 권한 확인 중...</p>

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          상품 수정하기
        </h1>
        <div className={styles.btn}>
          <button
            className={styles.cancelBtn}
            type='button'
            onClick={() => router.push(`/products/${id}`)}
          >
            취소
          </button>
          <SubmitButton disabled={isEmpty}>
            수정
          </SubmitButton>
        </div>
      </div>
      <div className={styles.inputs}>
        <Input 
          label='상품명'
          type='text'
          id='name'
          placeholder='상품명을 입력해주세요'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Textarea 
          label='상품 소개'
          id='description'
          placeholder='상품 소개를 입력해주세요'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input 
          label='판매가격'
          type='number'
          id='price'
          placeholder='판매 가격을 입력해주세요'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <TagInput
          label='태그'
          type='text'
          id='tags'
          tags={tags}
          setTags={setTags}
          placeholder='태그를 입력해주세요'
        />
      </div>
    </form>
  )
}