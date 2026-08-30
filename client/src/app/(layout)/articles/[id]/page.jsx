'use client';

import heartIcon from "@/assets/ic_heart.png";
import heartActiveIcon from '@/assets/ic_heart_active.png';
import profileIcon from "@/assets/ic_profile.png";
import BackLink from "@/components/BackLink";
import EditDeleteMenu from "@/components/EditDeleteMenu";
import CommentList from "../../products/_components/CommentList";
import formatDate from "@/utils/formatDate";
import Image from "next/image";
import styles from "./page.module.css";
import { useParams, useRouter } from "next/navigation";
import { useCreateArticleLike, useDeleteArticle, useDeleteArticleLike, useGetArticle } from "@/queries/articles";
import { useUser } from "@/queries/auth";
import { useEffect } from "react";
import { useCreateArticleComment, useDeleteComment, useGetArticleComments, useUpdateComment } from "@/queries/comment";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useInView } from "react-intersection-observer";

export default function ArticleDetail() {
  const commentLimit = 3;
  const router = useRouter();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { ref, inView } = useInView();
  
  // 인증
  const {
    data: user,
    isPending: isUserPending,
  } = useUser();

  // 게시글 상세 가져오기
  const {
    data: article,
    isPending: isArticlePending,
    isError: isArticleError,
    error: articleError,
  } = useGetArticle(id, Boolean(user));

  // 게시글 삭제하기
  const deleteArticleMutation = useDeleteArticle();
  function handleArticleDelete() {
    deleteArticleMutation.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['articles'] });
        router.push('/articles');
      },
      onError: (error) => {
        console.error('게시글 삭제 실패: ', error.response?.data?.message);
        alert('게시글 삭제에 실패했습니다');
      }
    })
  }

  // 게시글 좋아요 토클
  const createArticleLikeMutation = useCreateArticleLike();
  const deleteArticleLikeMutation = useDeleteArticleLike();
  const isLikePending =
    createArticleLikeMutation.isPending ||
    deleteArticleLikeMutation.isPending;
  function toggleLike() {
    if (article.isLiked) {
      deleteArticleLikeMutation.mutate(id, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['article', id] });
          queryClient.invalidateQueries({ queryKey: ['articles'] });
        },
        onError: (error) => {
          console.error('좋아요 처리 실패: ', error.response?.data?.message);
          alert('좋아요 처리에 실패했습니다');
        },
      });
    } else {
      createArticleLikeMutation.mutate(id, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['article', id] });
          queryClient.invalidateQueries({ queryKey: ['articles'] });
        },
        onError: (error) => {
          console.error('좋아요 처리 실패: ', error.response?.data?.message);
          alert('좋아요 처리에 실패했습니다');
        },
      });
    }
  }

  // 게시글 댓글 가져오기 (무한 스크롤)
  const {
    data: commentsData,
    isPending: isCommentPending,
    isError: isCommentError,
    error: commentError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetArticleComments(id, commentLimit);

  const comments =
    commentsData?.pages.flatMap((page) => page.list) ?? [];

  useEffect(() => { // 댓글 무한 스크롤
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);


  // 댓글 생성하기
  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm({ mode: 'onChange' });
  const createCommentMutation = useCreateArticleComment();
  function handleCreateComment(data) {
    createCommentMutation.mutate(
      { 
        articleId: id,
        data,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['articleComments', id] });
          reset();
        },
        onError: (error) => {
          console.error('댓글 생성 실패: ', error.response?.data?.message);
          alert('댓글 생성에 실패했습니다');
        },
      }
    );
  }

  // 댓글 수정하기
  const updateCommentMutation = useUpdateComment();
  function handleUpdateComment(commentId, content) {
    updateCommentMutation.mutate({ commentId, data: { content }}, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['articleComments', id, commentLimit] });
      },
      onError: (err) => {
        console.error('댓글 수정 실패: ', err.message);
        alert('댓글 수정 실패');
      },
    });
  }

  // 댓글 삭제하기
  const deleteCommentMutation = useDeleteComment();
  function handleDeleteComment(commentId) {
    deleteCommentMutation.mutate(commentId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['articleComments', id, commentLimit] });
      },
      onError: (err) => {
        console.error('댓글 삭제 실패: ', err.message);
        alert('댓글 삭제에 실패했습니다');
      },
    });
  }

  // 페이지 열었을 때, 로그인 안한 사용자라면 로그인 페이지로 이동
  useEffect(() => {
    if(!isUserPending && !user) {
      router.push('/signin');
    }
  }, [isUserPending, user, router]);

  if (isUserPending) return <p>사용자 인증 확인 중...</p>
  if (isArticlePending) return <p>게시글 상세 로딩 중...</p>
  if (isArticleError) return <p>게시글을 불러오지 못했습니다: {articleError.message}</p>

  return (
    <div className={styles.wrapper}>
      <section className={styles.articleSection}>
        <div className={styles.header}>
          <h1 className={styles.title}>{article.title}</h1>
          {user?.id === article.writer.id && (
            <EditDeleteMenu
              editHref={`/articles/${id}/edit`}
              onDelete={handleArticleDelete}
            />
          )}
        </div>
        <div className={styles.info}>
          <div className={styles.infoLeft}>
            <Image
              src={profileIcon}
              width={40}
              height={40}
              loading="eager"
              alt="프로필 아이콘"
            />
            <p className={styles.nickname}>
              {article.writer.nickname}
            </p>
            <p className={styles.date}>{formatDate(article.createdAt)}</p>
          </div>
          <button 
            type='button'
            className={styles.heart}
            onClick={toggleLike}
            disabled={isLikePending}
          >
            <Image
              src={article.isLiked ? heartActiveIcon : heartIcon}
              width={26}
              height={23}
              loading="eager"
              alt={article.isLiked ? '좋아요 취소' : '좋아요'}
            />
            <p className={styles.heartCount}>{article.likeCount}</p>
          </button>
        </div>
        <p className={styles.content}>{article.content}</p>
      </section>

     <form 
        onSubmit={handleSubmit(handleCreateComment)} 
        className={styles.formSection}
      >
        <label htmlFor='content' className={styles.label}>
          댓글 달기
        </label>
        <textarea
          className={styles.input}
          id='content'
          placeholder='댓글을 입력해주세요'
          {...register('content', {
            required: true,
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
          disabled={!isValid || createCommentMutation.isPending}
        >
          {createCommentMutation.isPending ? '등록 중...' : '등록'}
        </button>
      </form>

      <section>
        {isCommentPending ? (
          <p>댓글 불러오는 중...</p>
        ) : isCommentError ? (
          <p>
            {commentError.response?.data?.message ?? '댓글을 불러오지 못했습니다'}
          </p>
        ) : (
          <CommentList
            comments={comments}
            currentUserId={user?.id}
            onDelete={handleDeleteComment}
            onUpdate={handleUpdateComment}
            isPending={updateCommentMutation.isPending}
          />
        )}

        {hasNextPage && (
          <button
            ref={ref}
            type='button'
            disabled={!hasNextPage || isFetchingNextPage}
            onClick={() => fetchNextPage()}
          >
            {isFetchingNextPage
              ? '댓글 불러오는 중...'
              : '댓글 더 보기'
            }
          </button>
        )}
      </section>

      <div className={styles.backLink}>
        <BackLink href={'/articles'}/>
      </div>

    </div>
  );
}
