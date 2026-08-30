'use client';

import { useGetArticle, useUpdateArticle } from "@/queries/articles";
import { useUser } from "@/queries/auth";
import { useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import ArticleForm from "../../_components/ArticleForm";
import styles from "./page.module.css";

export default function EditArticle() {
  const { id } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  // 인증
  const {
    data: user,
    isPending: isUserPending
  } = useUser();

  // 게시글 상세 가져오기
  const {
    data: article,
    isPending: isArticlePending,
    isError: isArticleError,
    error: articleError,
  } = useGetArticle(id, Boolean(user));

  // 게시글 수정하기
  const updateArticleMutation = useUpdateArticle();
  function handleUpdateArticle(data) {
    updateArticleMutation.mutate(
      { 
        articleId: id, 
        data 
      }, 
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['article', id] });
          queryClient.invalidateQueries({ queryKey: ['articles'] });
          router.push(`/articles/${id}`);
        },
        onError: (error) => {
          console.error('게시글 수정 실패: ', error.response?.data?.message);
          alert('게시글 수정에 실패했습니다');
        },
      }
    );
  }

  useEffect(() => {
    if (!isUserPending && !user) {
      router.push('/signin');
    }
  }, [isUserPending, user, router]);

  if (isUserPending) return <p>사용자 인증 확인 중...</p>
  if (isArticlePending) return <p>게시글 불러오는 중...</p>
  if (isArticleError) return <p>게시글을 불러오는데 실패했습니다: {articleError.message}</p>
  if (user?.id !== article.writer.id) return <p>게시글 수정 권한이 없습니다</p>

  return (
    <div className={styles.wrapper}>
      <ArticleForm
        onSubmit={handleUpdateArticle}
        initialTitle={article.title}
        initialContent={article.content}
        submitText={
          updateArticleMutation.isPending
          ? '수정 중...'
          : '수정'
        }
      />
    </div>
  );
}
