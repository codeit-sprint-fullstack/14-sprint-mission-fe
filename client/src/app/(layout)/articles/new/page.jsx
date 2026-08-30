'use client';

import { useCreateArticle } from "@/queries/articles";
import { useUser } from "@/queries/auth";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ArticleForm from "../_components/ArticleForm";
import styles from "./page.module.css";

export default function ArticleCreate() {
  const router = useRouter();
  const queryClient = useQueryClient();
  
  // 인증
  const {
    data: user,
    isPending: isUserPending,
  } = useUser();

  // 게시글 생성하기
  const createArticleMutation = useCreateArticle();
  function handleArticleCreate(data) {
    createArticleMutation.mutate(data, {
      onSuccess: (article) => {
        queryClient.invalidateQueries({ queryKey: ['articles'] });
        router.push(`/articles/${article.id}`);
      },
      onError: (error) => {
        console.error('게시글 생성 실패: ', error.response?.data?.message);
        alert('게시글 생성에 실패했습니다');
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

  return (
    <div className={styles.wrapper}>
      <ArticleForm 
        onSubmit={handleArticleCreate}
        submitText={createArticleMutation.isPending
          ? '등록 중...'
          : '등록'
        }
      />
    </div>
  );
}
