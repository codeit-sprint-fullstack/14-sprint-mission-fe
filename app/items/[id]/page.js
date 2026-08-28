"use client";

import {
  getProduct,
  createProductComment,
  deleteComment,
  updateComment,
  favoriteProduct,
  unfavoriteProduct,
  deleteProduct,
} from "@/lib/api/products";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "./page.module.css";
import Image from "next/image";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();

  const productId = params.id;

  const [commentContent, setCommentContent] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingContent, setEditingContent] = useState("");

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const productQuery = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProduct(productId),
  });

  const createCommentMutation = useMutation({
    mutationFn: createProductComment,

    onSuccess: () => {
      setCommentContent("");

      queryClient.invalidateQueries({
        queryKey: ["product", productId],
      });
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: deleteComment,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["product", productId],
      });
    },
  });

  const updateCommentMutation = useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
      setEditingCommentId(null);
      setEditingContent("");
      queryClient.invalidateQueries({
        queryKey: ["product", productId],
      });
    },
  });

  const favoriteMutation = useMutation({
    mutationFn: ({ productId, isLiked }) => {
      if (isLiked) {
        return unfavoriteProduct(productId);
      }

      return favoriteProduct(productId);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["product", productId],
      });
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,

    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: ["product", productId],
        exact: true,
      });

      setIsDeleteModalOpen(false);
      router.replace("/items");
    },
  });

  function handleCommentSubmit(event) {
    event.preventDefault();

    const trimmedContent = commentContent.trim();

    if (!trimmedContent || createCommentMutation.isPending) {
      return;
    }

    createCommentMutation.mutate({
      productId,
      content: trimmedContent,
    });
  }

  function handleEditStart(comment) {
    setEditingCommentId(comment.id);
    setEditingContent(comment.content);
  }

  function handleEditCancel() {
    setEditingCommentId(null);
    setEditingContent("");
  }

  function handleEditSubmit(event) {
    event.preventDefault();

    const trimmedContent = editingContent.trim();

    if (
      editingCommentId === null ||
      !trimmedContent ||
      updateCommentMutation.isPending
    ) {
      return;
    }

    updateCommentMutation.mutate({
      commentId: editingCommentId,
      content: trimmedContent,
    });
  }

  if (productQuery.isPending) {
    return <p>상품 정보를 불러오는 중입니다.</p>;
  }

  if (productQuery.isError) {
    return <p>{productQuery.error.message}</p>;
  }

  const product = productQuery.data;
  const comments = product.comments ?? [];

  const imagePath = product.images?.[0];

  const imageUrl = imagePath ? `http://localhost:3001${imagePath}` : null;

  return (
    <main className={styles.container}>
      <div className={styles.productLayout}>
        <div className={styles.imageArea}>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt="제품 이미지"
              fill
              sizes="486px"
              className={styles.productImage}
            />
          ) : (
            <span>이미지 없음</span>
          )}{" "}
        </div>

        <section className={styles.productInfo}>
          <h1>{product.name}</h1>
          <strong>{product.price.toLocaleString()}원</strong>

          <button type="button" onClick={() => setIsDeleteModalOpen(true)}>
            삭제하기
          </button>

          <div className={styles.infoDivider} />

          <div>
            <h2>상품 소개</h2>
            <p>{product.description}</p>
          </div>

          <div>
            <h2>상품 태그</h2>

            <div>
              {product.tags.map((tag) => (
                <span key={tag}>#{tag}</span>
              ))}
            </div>

            <button
              type="button"
              onClick={() =>
                favoriteMutation.mutate({
                  productId,
                  isLiked: product.isLiked,
                })
              }
              disabled={favoriteMutation.isPending}
            >
              {favoriteMutation.isPending
                ? "처리 중..."
                : `${product.isLiked ? "♥" : "♡"} ${product.favoriteCount}`}
            </button>
          </div>
        </section>

        <section>
          <h2>문의하기</h2>

          <form onSubmit={handleCommentSubmit}>
            <textarea
              value={commentContent}
              onChange={(event) => setCommentContent(event.target.value)}
              placeholder="댓글을 입력해주세요."
            />
            <button
              type="submit"
              disabled={
                !commentContent.trim() || createCommentMutation.isPending
              }
            >
              {createCommentMutation.isPending ? "등록 중..." : "등록"}
            </button>
          </form>

          {comments.map((comment) => (
            <div key={comment.id}>
              {editingCommentId === comment.id ? (
                <form onSubmit={handleEditSubmit}>
                  <textarea
                    value={editingContent}
                    onChange={(event) => setEditingContent(event.target.value)}
                  />

                  <button
                    type="submit"
                    disabled={
                      !editingContent.trim() || updateCommentMutation.isPending
                    }
                  >
                    {updateCommentMutation.isPending
                      ? "수정 중..."
                      : "수정 완료"}
                  </button>

                  <button
                    type="button"
                    onClick={handleEditCancel}
                    disabled={updateCommentMutation.isPending}
                  >
                    취소
                  </button>
                </form>
              ) : (
                <>
                  <p>{comment.content}</p>
                  <span>{comment.user.nickname}</span>

                  <button
                    type="button"
                    onClick={() => handleEditStart(comment)}
                  >
                    수정
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteCommentMutation.mutate(comment.id)}
                    disabled={deleteCommentMutation.isPending}
                  >
                    {deleteCommentMutation.isPending ? "삭제 중" : "삭제"}
                  </button>
                </>
              )}
            </div>
          ))}
        </section>
      </div>
      {isDeleteModalOpen && (
        <div>
          <h2>상품을 삭제하시겠습니까?</h2>
          <button type="button" onClick={() => setIsDeleteModalOpen(false)}>
            취소
          </button>
          <button
            type="button"
            onClick={() => deleteProductMutation.mutate(productId)}
            disabled={deleteProductMutation.isPending}
          >
            {deleteProductMutation.isPending ? "삭제 중" : "삭제"}
          </button>
        </div>
      )}
    </main>
  );
}
