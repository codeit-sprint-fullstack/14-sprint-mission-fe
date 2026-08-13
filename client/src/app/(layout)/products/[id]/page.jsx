'use client';

import defaultImg from '@/assets/img_default.svg';
import profileIcon from '@/assets/ic_profile.png';
import heartIcon from '@/assets/ic_heart.png';
import { useUser } from "@/queries/auth";
import { useGetProduct, useGetProductComments } from "@/queries/products";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from './page.module.css';
import formatDate from '@/utils/formatDate';
import CommentList from '@/components/comment/CommentList';

export default function ProductDetail() {
  const CommentLimit = 4;
  const params = useParams();
  const { id } = params;
  const router = useRouter();
  const { 
    data: user, 
    isPending: isUserPending 
  } = useUser();
  const { 
    data: product, 
    isPending: isProductPending, 
    isError: isProductError, 
    error: productError, 
  } = useGetProduct(id, Boolean(user));
  const {
    data: comments,
    isPending: isCommentPending,
    isError: isCommentError,
    error: commentError,
  } = useGetProductComments(id, CommentLimit);

  useEffect(() => {
    if (!isUserPending && !user) {
      router.push('/signin');
    }
  }, [isUserPending, user, router])

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
        />
        <div className={styles.productInfo}>
          <div>
            <p className={styles.name}>
              {product.name}
            </p>
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
              <Image
                src={heartIcon}
                width={26}
                height={23}
                loading='eager'
                alt=''
              />
              <p className={styles.favoriteCount}>
                {product.favoriteCount}
              </p>
            </div>
          </div>
        </div>
      </section>
      <form action="" className={styles.formSection}>
        <label htmlFor='content' className={styles.label}>
          문의하기
        </label>
        <textarea
          className={styles.input}
          id='content'
          type='text'
          placeholder='개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다.'
        />
        <button type='submit' className={styles.submitBtn}>
          등록
        </button>
      </form>
      <section className={styles.commentSection}>
        {isCommentPending ? (
          <p>댓글 불러오는 중...</p>
        ) : (
          <CommentList comments={comments}/>
        )}
      </section>
    </div>
  )
}