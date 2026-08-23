import { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import ConfirmModal from "@/components/items/ConfirmModal";
import useHasAccessToken from "@/hooks/useHasAccessToken";
import { createProductComment, deleteComment, getProductComments, updateComment } from "@/lib/api/comments";
import { deleteProduct, favoriteProduct, getProduct, unfavoriteProduct } from "@/lib/api/products";
import { getMe } from "@/lib/api/users";
import { removeAccessToken } from "@/lib/auth";
import { queryKeys } from "@/lib/queryKeys";
import styles from "@/styles/ItemDetailPage.module.css";

function formatDate(value) {
  if (!value) return "";
  return new Intl.DateTimeFormat("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(value));
}

function Avatar({ src }) {
  // API 프로필 이미지는 임의의 외부 URL일 수 있다.
  // eslint-disable-next-line @next/next/no-img-element
  return <img className={styles.avatar} src={src || "/images/user-profile.svg"} alt="" />;
}

function MoreIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12.5" cy="6.5" r="1.5" fill="currentColor" />
      <circle cx="12.5" cy="11.5" r="1.5" fill="currentColor" />
      <circle cx="12.5" cy="16.5" r="1.5" fill="currentColor" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M21.2002 4.90039C25.1056 4.90039 28.2456 7.9009 28.5469 11.7812L28.5674 12.1602V12.4004C28.5673 14.5632 27.7282 16.4503 26.3252 17.7363L26.0332 18.0039V18.0986C26.0192 18.1104 26.0048 18.1225 25.9902 18.1348C25.7823 18.3101 25.5002 18.5534 25.1641 18.8457C24.4906 19.4313 23.5886 20.2253 22.6055 21.0918C20.6413 22.8229 18.3533 24.8449 16.8906 26.1084C16.4244 26.4969 15.7084 26.4969 15.2422 26.1084C13.7769 24.8428 11.453 22.817 9.47559 21.0889C8.48435 20.2226 7.58088 19.4314 6.91699 18.8486C6.5851 18.5573 6.31359 18.3184 6.12109 18.1484C6.11414 18.1423 6.10726 18.1358 6.10059 18.1299V18.0273L5.83691 17.7637C4.3963 16.3231 3.56749 14.4151 3.56738 12.4004V12.1426C3.69556 8.23997 7.02307 5.03324 10.9336 5.0332C11.551 5.0332 12.3387 5.24524 13.1074 5.65918C13.8495 6.05883 14.5078 6.61335 14.9443 7.24316C15.4238 8.26862 16.9011 8.25157 17.3467 7.19141C17.7137 6.53143 18.356 5.95411 19.1055 5.53613C19.8735 5.10782 20.6564 4.90042 21.2002 4.90039Z" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function MoreMenu({ onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.moreWrap}>
      <button type="button" className={styles.moreButton} aria-label="메뉴 열기" onClick={() => setOpen((value) => !value)}><MoreIcon /></button>
      {open && (
        <div className={styles.menu}>
          <button type="button" onClick={() => { setOpen(false); onEdit(); }}>수정하기</button>
          <button type="button" onClick={() => { setOpen(false); onDelete(); }}>삭제하기</button>
        </div>
      )}
    </div>
  );
}

export default function ItemDetailPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const itemId = router.query.itemId;
  const hasToken = useHasAccessToken();
  const [commentContent, setCommentContent] = useState("");
  const [editingComment, setEditingComment] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [confirmTarget, setConfirmTarget] = useState(null);
  const [mutationError, setMutationError] = useState("");

  useEffect(() => {
    if (!router.isReady) return;
    if (!hasToken) {
      router.replace(`/signin?redirect=${encodeURIComponent(router.asPath)}`);
    }
  }, [hasToken, router]);

  const enabled = router.isReady && hasToken && Boolean(itemId);
  const { data: user, isError: isUserError, error: userError } = useQuery({
    queryKey: queryKeys.me,
    queryFn: getMe,
    enabled,
    retry: false,
  });
  const { data: product, isPending, isError, error } = useQuery({
    queryKey: queryKeys.products.detail(itemId),
    queryFn: () => getProduct(itemId),
    enabled,
    retry: 1,
  });

  const commentsQuery = useInfiniteQuery({
    queryKey: queryKeys.comments.product(itemId),
    queryFn: ({ pageParam }) => getProductComments({ productId: itemId, limit: 10, cursor: pageParam }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    enabled,
  });

  const comments = useMemo(
    () => commentsQuery.data?.pages.flatMap((page) => page.list) ?? [],
    [commentsQuery.data],
  );
  const isOwner = Boolean(user && product && user.id === product.ownerId);

  useEffect(() => {
    if (!isUserError) return;
    if (userError?.response?.status === 401) {
      removeAccessToken();
      router.replace(`/signin?redirect=${encodeURIComponent(router.asPath)}`);
    }
  }, [isUserError, router, userError]);

  const favoriteMutation = useMutation({
    mutationFn: () => product.isFavorite ? unfavoriteProduct(itemId) : favoriteProduct(itemId),
    onMutate: async () => {
      const key = queryKeys.products.detail(itemId);
      await queryClient.cancelQueries({ queryKey: key });
      const previous = queryClient.getQueryData(key);
      queryClient.setQueryData(key, (old) => old && ({
        ...old,
        isFavorite: !old.isFavorite,
        favoriteCount: Math.max(0, (old.favoriteCount ?? 0) + (old.isFavorite ? -1 : 1)),
      }));
      return { previous };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(queryKeys.products.detail(itemId), context?.previous);
      setMutationError(err.response?.data?.message || "좋아요 처리에 실패했습니다.");
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: queryKeys.products.detail(itemId) }),
  });

  const productDeleteMutation = useMutation({
    mutationFn: () => deleteProduct(itemId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
      router.replace("/items");
    },
    onError: (err) => setMutationError(err.response?.data?.message || "상품 삭제에 실패했습니다."),
  });

  const invalidateComments = () => queryClient.invalidateQueries({ queryKey: queryKeys.comments.product(itemId) });
  const createMutation = useMutation({
    mutationFn: createProductComment,
    onSuccess: () => { setCommentContent(""); invalidateComments(); },
    onError: (err) => setMutationError(err.response?.data?.message || "문의 등록에 실패했습니다."),
  });
  const updateCommentMutation = useMutation({
    mutationFn: updateComment,
    onSuccess: () => { setEditingComment(null); setEditContent(""); invalidateComments(); },
    onError: (err) => setMutationError(err.response?.data?.message || "댓글 수정에 실패했습니다."),
  });
  const deleteCommentMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => { setConfirmTarget(null); invalidateComments(); },
    onError: (err) => setMutationError(err.response?.data?.message || "댓글 삭제에 실패했습니다."),
  });

  if (!hasToken || !router.isReady || isPending) {
    return <main className={styles.state}><span className={styles.spinner} />상품 정보를 불러오는 중입니다...</main>;
  }
  if (isError) {
    return <main className={styles.state}><strong>상품을 불러오지 못했습니다.</strong><span>{error?.response?.data?.message || "잠시 후 다시 시도해 주세요."}</span><Link href="/items">목록으로 돌아가기</Link></main>;
  }

  return (
    <>
      <Head><title>{product.name} | 판다마켓</title></Head>
      <main className={styles.main}>
        <section className={styles.productSection}>
          <div className={styles.productImageWrap}>
            {product.images?.[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img className={styles.productImage} src={product.images[0]} alt={product.name} />
            ) : <div className={styles.noImage}>이미지가 없습니다</div>}
          </div>

          <div className={styles.productInfo}>
            <div className={styles.headingRow}>
              <div><h1>{product.name}</h1><p className={styles.price}>{product.price.toLocaleString()}원</p></div>
              {isOwner && <MoreMenu onEdit={() => router.push(`/items/${itemId}/edit`)} onDelete={() => setConfirmTarget({ type: "product" })} />}
            </div>
            <div className={styles.divider} />
            <h2>상품 소개</h2><p className={styles.description}>{product.description}</p>
            <h2>상품 태그</h2>
            <div className={styles.tags}>{product.tags.map((tag) => <span key={tag}>#{tag}</span>)}</div>
            <div className={styles.sellerRow}>
              <div className={styles.seller}><Avatar /><div><strong>{product.ownerNickname || "판매자"}</strong><span>{formatDate(product.createdAt)}</span></div></div>
              <button type="button" className={`${styles.favoriteButton} ${product.isFavorite ? styles.favoriteActive : ""}`} onClick={() => favoriteMutation.mutate()} disabled={favoriteMutation.isPending}>
                <HeartIcon /><span>{product.favoriteCount}</span>
              </button>
            </div>
          </div>
        </section>

        <section className={styles.commentsSection}>
          <h2>문의하기</h2>
          <textarea value={commentContent} onChange={(event) => setCommentContent(event.target.value)} placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포 시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다." />
          <div className={styles.commentSubmitRow}>
            <button type="button" onClick={() => createMutation.mutate({ productId: itemId, content: commentContent.trim() })} disabled={!commentContent.trim() || createMutation.isPending}>{createMutation.isPending ? "등록 중..." : "등록"}</button>
          </div>

          {commentsQuery.isPending ? <div className={styles.commentsState}>문의를 불러오는 중입니다...</div> : commentsQuery.isError ? <div className={styles.commentsState}>문의를 불러오지 못했습니다.</div> : comments.length === 0 ? <div className={styles.commentsState}>아직 등록된 문의가 없습니다.</div> : (
            <ul className={styles.commentList}>
              {comments.map((comment) => {
                const isWriter = user?.id === comment.writer.id;
                return (
                  <li key={comment.id}>
                    <div className={styles.commentTop}>
                      {editingComment === comment.id ? (
                        <div className={styles.editComment}><textarea value={editContent} onChange={(event) => setEditContent(event.target.value)} /><div><button type="button" onClick={() => setEditingComment(null)}>취소</button><button type="button" onClick={() => updateCommentMutation.mutate({ commentId: comment.id, content: editContent.trim() })} disabled={!editContent.trim() || updateCommentMutation.isPending}>수정</button></div></div>
                      ) : <p>{comment.content}</p>}
                      {isWriter && editingComment !== comment.id && <MoreMenu onEdit={() => { setEditingComment(comment.id); setEditContent(comment.content); }} onDelete={() => setConfirmTarget({ type: "comment", id: comment.id })} />}
                    </div>
                    <div className={styles.commentWriter}><Avatar src={comment.writer.image} /><div><strong>{comment.writer.nickname}</strong><span>{formatDate(comment.createdAt)}</span></div></div>
                  </li>
                );
              })}
            </ul>
          )}

          {commentsQuery.hasNextPage && <button type="button" className={styles.loadMore} onClick={() => commentsQuery.fetchNextPage()} disabled={commentsQuery.isFetchingNextPage}>{commentsQuery.isFetchingNextPage ? "불러오는 중..." : "문의 더 보기"}</button>}
        </section>

        <div className={styles.backRow}><Link href="/items">목록으로 돌아가기 ↩</Link></div>
      </main>

      {confirmTarget && <ConfirmModal title={confirmTarget.type === "product" ? "상품을 삭제하시겠어요?" : "댓글을 삭제하시겠어요?"} description="삭제한 내용은 복구할 수 없습니다." confirmText="삭제" isPending={productDeleteMutation.isPending || deleteCommentMutation.isPending} onClose={() => setConfirmTarget(null)} onConfirm={() => confirmTarget.type === "product" ? productDeleteMutation.mutate() : deleteCommentMutation.mutate(confirmTarget.id)} />}

      {mutationError && <ConfirmModal title="요청을 처리하지 못했습니다." description={mutationError} confirmText="확인" onClose={() => setMutationError("")} onConfirm={() => setMutationError("")} />}
    </>
  );
}
