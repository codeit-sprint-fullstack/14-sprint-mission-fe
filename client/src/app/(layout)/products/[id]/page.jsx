'use client';

import heartIcon from '@/assets/ic_heart.png';
import heartActiveIcon from '@/assets/ic_heart_active.png';
import kebabIcon from '@/assets/ic_kebab.png';
import profileIcon from '@/assets/ic_profile.png';
import defaultImg from '@/assets/img_default.svg';
import BackLink from '@/components/BackLink';
import ConfirmModal from '@/components/ConfirmModal';
import { useUser } from '@/queries/auth';
import { useDeleteComment, useUpdateComment } from '@/queries/comment';
import { useCreateProductComment, useCreateProductFavorite, useDeleteProduct, useDeleteProductFavorite, useGetProduct, useGetProductComments } from "@/queries/products";
import formatDate from '@/utils/formatDate';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CommentList from '../_components/CommentList';
import styles from './page.module.css';

export default function ProductDetail() {
  const CommentLimit = 4;
  const params = useParams();
  const { id } = params;
  const router = useRouter();
  const queryClient = useQueryClient();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('정말로 상품을 삭제하시겠어요?')

  // 인증
  const { 
    data: user, 
    isPending: isUserPending 
  } = useUser();

  // 상품 정보 가져오기
  const { 
    data: product, 
    isPending: isProductPending, 
    isError: isProductError, 
    error: productError, 
  } = useGetProduct(id, Boolean(user));

  // 상품 삭제하기
  const deleteProductMutation = useDeleteProduct();
  function onDelete() {
    deleteProductMutation.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['products'] });
        router.push('/products');
      },
      onError: (err) => {
        console.error('상품 삭제 실패: ', err.response?.data?.message);
        setModalMessage('상품 삭제에 실패했습니다');
      },
    });
  }

  // 상품 좋아요 토글
  const createFavoriteMutation = useCreateProductFavorite();
  const deleteFavoriteMutation = useDeleteProductFavorite();
  const isFavoritePending = 
    createFavoriteMutation.isPending || 
    deleteFavoriteMutation.isPending;
  function toggleFavorite() {
    if (product.isFavorite) {
      deleteFavoriteMutation.mutate(id, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['product', id] });
          queryClient.invalidateQueries({ queryKey: ['products'] });
        },
        onError: (err) => {
          console.error('좋아요 처리 실패: ', err.response?.data?.message);
          alert('좋아요 처리에 실패했습니다');
        },
      });
    } else {
      createFavoriteMutation.mutate(id, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['product', id] });
          queryClient.invalidateQueries({ queryKey: ['products'] });
        },
        onError: (err) => {
          console.error('좋아요 처리 실패: ', err.response?.data?.message);
          alert('좋아요 처리에 실패했습니다');
        },
      });
    }
  }

  // 상품 댓글 가져오기
  const {
    data: comments,
    isPending: isCommentPending,
    isError: isCommentError,
    error: commentError,
  } = useGetProductComments(id, CommentLimit);

  // 상품 댓글 생성하기
  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm({ mode: 'onChange' });
  const createCommentMutation = useCreateProductComment();
  function onSubmit(data) {
    createCommentMutation.mutate({ productId:id, data }, { // mutate는 하나의 값만 전달 가능 -> 객체로 전달
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['comments', id, CommentLimit]} );
        reset();
      },
      onError: (err) => {
        console.error('댓글 생성 실패: ', err.message);
        alert('댓글 생성에 실패했습니다');
      },
    });
  }

  // 상품 댓글 수정하기
  const updateCommentMutation = useUpdateComment()
  function handleUpdateComment(commentId, content) {
    updateCommentMutation.mutate({ commentId, data: { content }}, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['comments', id, CommentLimit] });
      },
      onError: (err) => {
        console.error('댓글 수정 실패: ', err.message);
        alert('댓글 수정 실패');
      },
    });
  }

  // 상품 댓글 삭제하기
  const deleteCommentMutation = useDeleteComment();
  function handelDeleteComment(commentId) {
    deleteCommentMutation.mutate(commentId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['comments', id, CommentLimit] });
      },
      onError: (err) => {
        console.error('댓글 삭제 싪패: ', err.message);
        alert('댓글 삭제에 실패했습니다');
      },
    });
  }

  // 페이지 열었을 때, 로그인 안한 사용자라면 로그인 페이지로 이동
  useEffect(() => {
    if (!isUserPending && !user) {
      router.push('/signin');
    }
  }, [isUserPending, user, router]);

  if (isUserPending) return <p>사용자 인증 확인 중...</p>
  if (isProductPending) return <p>상품 정보 로딩 중...</p>
  if (isProductError) return <p>{productError.message}</p>
  
  return (
    <div className={styles.wrapper}>
      <section className={styles.productSection}>
        <Image
          className={styles.productImg}
          src={defaultImg}
          width={484}
          height={484}
          alt={product.name}
          loading='eager'
        />
        <div className={styles.productInfo}>
          <div>
            <div className={styles.infoTop}>
              <p className={styles.name}>
                {product.name}
              </p>
              {user?.id === product.ownerId && (
                <div className={styles.menuWrapper}>
                  <button
                    className={styles.menuIcon}
                    type='button'
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                  >
                    <Image
                      src={kebabIcon}
                      width={24}
                      height={24}
                      alt='게시물 수정 및 삭제 메뉴'
                      loading='eager'
                    />
                  </button>
                  {isMenuOpen && (
                    <ul className={styles.menuList}>
                      <li>
                        <button
                          className={styles.menuBtn}
                          type='button'
                          onClick={() => router.push(`/products/${id}/edit`)}
                        >
                          수정하기
                        </button>
                      </li>
                      <li>
                        <button 
                          className={styles.menuBtn}
                          type='button'
                          onClick={() => {
                            setIsModalOpen(true)
                            setIsMenuOpen(false)
                          }}
                        >
                          삭제하기
                        </button>
                      </li>
                    </ul>
                  )}
                </div>
              )}
            </div>

            <p className={styles.price}>
              {(product.price).toLocaleString()}원
            </p>
          </div>
          <div>
            <p className={styles.title}>
              상품 소개
            </p>
            <p className={styles.description}>
              {product.description}
            </p>
          </div>
          <div>
            <p className={styles.title}>
              상품 태그
            </p>
            <p className={styles.tags}>
              {product.tags.map((tag) => (
                <span className={styles.tag} key={tag}>
                  #{tag}
                </span>
              ))}
            </p>
          </div>
          <div className={styles.userSection}>
            <div className={styles.userInfo}>
              <Image
                src={profileIcon}
                width={40}
                height={40}
                alt=''
              />
              <div className={styles.userInfoRight}>
                <p className={styles.nickname}>
                  {product.ownerNickname}
                </p>
                <p className={styles.date}>
                  {formatDate(product.createdAt)}
                </p>
              </div>
            </div>
            <div className={styles.favorite}>
              <button 
                type='button'
                className={styles.heartIcon} 
                onClick={toggleFavorite}
                disabled={isFavoritePending}
              >
                <Image
                  src={product.isFavorite ? heartActiveIcon : heartIcon}
                  width={26}
                  height={23}
                  loading='eager'
                  alt={product.isFavorite ? '좋아요 취소' : '좋아요'}
                />
              </button>
              <p className={styles.favoriteCount}>
                {product.favoriteCount}
              </p>
            </div>
          </div>
        </div>
      </section>
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className={styles.formSection}
      >
        <label htmlFor='content' className={styles.label}>
          문의하기
        </label>
        <textarea
          className={styles.input}
          id='content'
          type='text'
          placeholder='개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다.'
          {...register('content', {
            required: true,
            minLength: {
              value: 1,
              message: '1자 이상 입력해주세요'
            },
            maxLength: {
              value: 100,
              message: '100자 이내로 입력해주세요'
            }
          })}
        />
        {errors.content && (
          <p>
            {errors.content.message}
          </p>
        )}
        <button 
          type='submit' 
          className={styles.submitBtn}
          disabled={!isValid}
        >
          {createCommentMutation.isPending ? '등록 중...' : '등록'}
        </button>
      </form>
      <section className={styles.commentSection}>
        {isCommentPending ? (
          <p>댓글 불러오는 중...</p>
        ) : isCommentError ? (
          <p>
            {commentError.response?.data?.message ?? '댓글을 불러오지 못했습니다'}
          </p>
        ) : (
          <CommentList 
            comments={comments}
            currentUserId={user?.id} // 댓글 수정 및 삭제 메뉴를 위한 prop
            onDelete={handelDeleteComment}
            onUpdate={handleUpdateComment}
            isPending={updateCommentMutation.isPending}
          />
        )}
      </section>
      <div className={styles.backlink}>
        <BackLink href={'/products'}/>
      </div>
      {isModalOpen && (
        <ConfirmModal 
          message={modalMessage}
          onCancel={() => setIsModalOpen(false)}
          onDelete={() => onDelete()}
          isPending={deleteProductMutation.isPending}
          isError={deleteProductMutation.isError}
        />
      )}
    </div>
  )
}