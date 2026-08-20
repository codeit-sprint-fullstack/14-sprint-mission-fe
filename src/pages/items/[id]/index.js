import {
  getProductDetail,
  addProductFavorite,
  removeProductFavorite,
} from "@/api/productsApi";
import { getCurrentUser } from "@/api/usersApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { createProductComment, getProductComments } from "@/api/commentsApi";
import Link from "next/link";
import styles from "./ItemDetail.module.css";

export default function ItemDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const DEFAULT_IMAGE = "/images/default_product.png";
  const queryClient = useQueryClient();

  const [accessToken, setAccessToken] = useState(null);
  const [commentContent, setCommentContent] = useState("");
  const [openCommentMenuId, setOpenCommentMenuId] = useState(null);
  const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);

  useEffect(() => {
    const savedAccessToken = localStorage.getItem("accessToken");
    if (!savedAccessToken) {
      router.replace("/signin");
      return;
    }

    setAccessToken(savedAccessToken);
  }, [router]);

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductDetail(id, accessToken),
    enabled: router.isReady && Boolean(id) && Boolean(accessToken),
    retry: false,
  });

  const {
    data: commentsData,
    isLoading: isCommentsLoading,
    isError: isCommentsError,
  } = useQuery({
    queryKey: ["productComments", id],
    queryFn: () =>
      getProductComments({
        productId: id,
        limit: 10,
      }),
    enabled: router.isReady && Boolean(id) && Boolean(accessToken),
  });

  const { data: currentUser } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => getCurrentUser(accessToken),
    enabled: Boolean(accessToken),
    retry: false,
  });

  const createCommentMutation = useMutation({
    mutationFn: (content) =>
      createProductComment({
        productId: id,
        content,
        accessToken,
      }),

    onSuccess: () => {
      setCommentContent("");

      queryClient.invalidateQueries({
        queryKey: ["productComments", id],
      });
    },

    onError: (mutationError) => {
      if (mutationError.status === 401) {
        localStorage.removeItem("accessToken");
        router.replace("/signin");
      }
    },
  });

  const favoriteMutation = useMutation({
    mutationFn: () => {
      if (product.isFavorite) {
        return removeProductFavorite(id, accessToken);
      }

      return addProductFavorite(id, accessToken);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["product", id],
      });
    },

    onError: (favoriteError) => {
      if (favoriteError.status === 401) {
        localStorage.removeItem("accessToken");
        router.replace("/signin");
      }
    },
  });

  function handleFavoriteClick() {
    if (favoriteMutation.isPending) {
      return;
    }

    favoriteMutation.mutate();
  }

  const comments = commentsData?.list || [];

  function handleImageError(event) {
    event.currentTarget.src = DEFAULT_IMAGE;
  }

  function handleCreateComment() {
    const trimmedComment = commentContent.trim();

    if (!trimmedComment || createCommentMutation.isPending) {
      return;
    }

    createCommentMutation.mutate(trimmedComment);
  }

  useEffect(() => {
    if (error?.status === 401) {
      localStorage.removeItem("accessToken");
      router.replace("/signin");
    }
  }, [error, router]);

  if (isLoading) {
    return <p>상품 정보를 불러오는 중입니다.</p>;
  }

  if (isError) {
    return <p>상품 정보를 불러오지 못했습니다.</p>;
  }

  if (!product) {
    return null;
  }

  return (
    <div className={styles.detailPage}>
      <section className={styles.productSection}>
        <div className={styles.productInfo}>
          <img
            className={styles.productImage}
            src={product.images?.[0] || DEFAULT_IMAGE}
            alt={product.name}
            onError={handleImageError}
          />

          <div className={styles.productContent}>
            <div className={styles.titleArea}>
              <h1 className={styles.productName}>{product.name}</h1>

              {currentUser?.id === product.ownerId && (
                <div className={styles.productMenuArea}>
                  <button
                    className={styles.menuButton}
                    type="button"
                    aria-label="상품 메뉴 열기"
                    onClick={() => {
                      setIsProductMenuOpen((currentIsOpen) => !currentIsOpen);
                    }}
                  >
                    <img src="/images/menu_button.png" alt="" />
                  </button>

                  {isProductMenuOpen && (
                    <div className={styles.productMenu}>
                      <Link
                        className={styles.menuItem}
                        href={`/items/${id}/edit`}
                      >
                        수정하기
                      </Link>

                      <button className={styles.menuItem} type="button">
                        삭제하기
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <p className={styles.productPrice}>
              {product.price.toLocaleString()}원
            </p>

            <div className={styles.line} />
            <h2 className={styles.infoTitle}>상품소개</h2>
            <p className={styles.description}>{product.description}</p>

            <h2 className={styles.infoTitle}>상품태그</h2>
            <div className={styles.tagList}>
              {product.tags?.map((tag) => (
                <span className={styles.tag} key={tag}>
                  #{tag}
                </span>
              ))}
            </div>

            <div className={styles.ownerArea}>
              <div className={styles.ownerInfo}>
                <img
                  className={styles.profileImage}
                  src="/images/default_profile.png"
                  alt="판매자 프로필"
                />

                <div>
                  <p className={styles.ownerName}>
                    {product.ownerNickname || "판매자"}
                  </p>
                  <p className={styles.createdAt}>
                    {new Date(product.createdAt).toLocaleDateString("ko-KR")}
                  </p>
                </div>
              </div>

              <div className={styles.favoriteArea}>
                <button
                  className={styles.favoriteButton}
                  type="button"
                  onClick={handleFavoriteClick}
                  disabled={favoriteMutation.isPending}
                  aria-label={
                    product.isFavorite ? "좋아요 취소" : "좋아요 추가"
                  }
                >
                  <img
                    src={
                      product.isFavorite
                        ? "/images/active_heart.png"
                        : "/images/heart.png"
                    }
                    alt=""
                  />
                  <span>{product.favoriteCount}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.commentSection}>
        <h2 className={styles.commentTitle}>문의하기</h2>

        <textarea
          className={styles.commentInput}
          value={commentContent}
          onChange={(event) => setCommentContent(event.target.value)}
          placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
        />

        <div className={styles.commentButtonArea}>
          <button
            className={styles.commentSubmitButton}
            type="button"
            onClick={handleCreateComment}
            disabled={!commentContent.trim() || createCommentMutation.isPending}
          >
            {createCommentMutation.isPending ? "등록 중..." : "등록"}
          </button>
        </div>

        <div className={styles.commentList}>
          {isCommentsLoading && (
            <p className={styles.commentMessage}>댓글을 불러오는 중입니다.</p>
          )}

          {isCommentsError && (
            <p className={styles.commentMessage}>댓글을 불러오지 못했습니다.</p>
          )}

          {!isCommentsLoading && !isCommentsError && comments.length === 0 && (
            <div className={styles.emptyComments}>
              <img src="/images/not_yet_comment.png" alt="" />
              <p>아직 문의가 없어요.</p>
            </div>
          )}

          {!isCommentsLoading &&
            !isCommentsError &&
            comments.map((comment) => (
              <div className={styles.commentItem} key={comment.id}>
                <div className={styles.commentTop}>
                  <p className={styles.commentContent}>{comment.content}</p>

                  {currentUser?.id === comment.writer.id && (
                    <div className={styles.commentMenuArea}>
                      <button
                        className={styles.commentMenuButton}
                        type="button"
                        aria-label="댓글 메뉴 열기"
                        onClick={() => {
                          setOpenCommentMenuId((currentMenuId) =>
                            currentMenuId === comment.id ? null : comment.id,
                          );
                        }}
                      >
                        <img src="/images/menu_button.png" alt="" />
                      </button>

                      {/* 같은 댓글 메뉴를 다시 누르면 닫고, 다른 댓글을 누르면 그 댓글 메뉴를 연다는 의미 */}
                      {openCommentMenuId === comment.id && (
                        <div className={styles.commentMenu}>
                          <button className={styles.menuItem} type="button">
                            수정하기
                          </button>

                          <button className={styles.menuItem} type="button">
                            삭제하기
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className={styles.commentWriter}>
                  <img
                    className={styles.commentProfile}
                    src={comment.writer.image || "/images/default_profile.png"}
                    alt=""
                  />

                  <div>
                    <p className={styles.commentNickname}>
                      {comment.writer.nickname}
                    </p>

                    <p className={styles.commentDate}>
                      {new Date(comment.createdAt).toLocaleDateString("ko-KR")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>

      <Link className={styles.backButton} href="/items">
        <span>목록으로 돌아가기</span>
        <img src="/images/ic_back.png" alt="" />
      </Link>
    </div>
  );
}
