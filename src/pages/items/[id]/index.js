import {
  getProductDetail,
  deleteProduct,
  addProductFavorite,
  removeProductFavorite,
} from "@/api/productsApi";
import { getCurrentUser } from "@/api/usersApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import {
  createProductComment,
  getProductComments,
  updateComment,
  deleteComment,
} from "@/api/commentsApi";
import Link from "next/link";
import styles from "./ItemDetail.module.css";

export default function ItemDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const DEFAULT_IMAGE = "/images/default_product.png";
  const queryClient = useQueryClient();
  const tagWidthRef = useRef(null);

  const [accessToken, setAccessToken] = useState(null);
  const [isProductDeleteModalOpen, setIsProductDeleteModalOpen] =
    useState(false);
  const [visibleTagCount, setVisibleTagCount] = useState(null);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [openCommentMenuId, setOpenCommentMenuId] = useState(null);
  const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editContent, setEditContent] = useState("");

  const MAX_VISIBLE_TAG_ROWS = 2;
  const TAG_GAP = 8;
  const MORE_TAG_BUTTON_WIDTH = 104;

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

  useEffect(() => {
    if (!product?.tags?.length || !tagWidthRef.current) {
      return;
    }

    function calculateVisibleTagCount() {
      const containerWidth = tagWidthRef.current.clientWidth;

      const tagElements =
        tagWidthRef.current.querySelectorAll("[data-tag-width]");

      const tagWidths = Array.from(tagElements).map(
        (tagElement) => tagElement.offsetWidth,
      );

      function getRowCount(widths) {
        let rowCount = 1;
        let currentRowWidth = 0;

        for (const width of widths) {
          const nextWidth =
            currentRowWidth === 0 ? width : currentRowWidth + TAG_GAP + width;

          if (nextWidth <= containerWidth) {
            currentRowWidth = nextWidth;
          } else {
            rowCount += 1;
            currentRowWidth = width;
          }
        }

        return rowCount;
      }

      let count = tagWidths.length;

      while (count > 0) {
        const widthsToShow = tagWidths.slice(0, count);

        if (count < tagWidths.length) {
          widthsToShow.push(MORE_TAG_BUTTON_WIDTH);
        }

        if (getRowCount(widthsToShow) <= MAX_VISIBLE_TAG_ROWS) {
          break;
        }

        count -= 1;
      }

      setVisibleTagCount(count);
    }

    calculateVisibleTagCount();

    window.addEventListener("resize", calculateVisibleTagCount);

    return () => {
      window.removeEventListener("resize", calculateVisibleTagCount);
    };
  }, [product]);

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

  const updateCommentMutation = useMutation({
    mutationFn: ({ commentId, content }) =>
      updateComment({
        commentId,
        content,
        accessToken,
      }),

    onSuccess: () => {
      setEditingCommentId(null);
      setEditContent("");

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

  const deleteProductMutation = useMutation({
    mutationFn: (productId) => deleteProduct(productId, accessToken),

    onSuccess: () => {
      setIsProductDeleteModalOpen(false);

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      router.push("/items");
    },

    onError: (mutationError) => {
      if (mutationError.status === 401) {
        localStorage.removeItem("accessToken");
        router.replace("/signin");
      }
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: (commentId) =>
      deleteComment({
        commentId,
        accessToken,
      }),

    onSuccess: () => {
      setOpenCommentMenuId(null);

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

  function handleOpenProductDeleteModal() {
    setIsProductDeleteModalOpen(true);
    setIsProductMenuOpen(false);
  }

  function handleCloseProductDeleteModal() {
    setIsProductDeleteModalOpen(false);
  }

  function handleCreateComment() {
    const trimmedComment = commentContent.trim();

    if (!trimmedComment || createCommentMutation.isPending) {
      return;
    }

    createCommentMutation.mutate(trimmedComment);
  }

  function handleUpdateComment() {
    const trimmedContent = editContent.trim();

    if (
      editingCommentId === null ||
      trimmedContent.length === 0 ||
      updateCommentMutation.isPending
    ) {
      return;
    }

    updateCommentMutation.mutate({
      commentId: editingCommentId,
      content: trimmedContent,
    });
  }

  function handleStartEdit(comment) {
    setEditingCommentId(comment.id);
    setEditContent(comment.content);
    setOpenCommentMenuId(null);
  }

  function handleCancelEdit() {
    setEditingCommentId(null);
    setEditContent("");
  }

  function handleConfirmProductDelete() {
    if (deleteProductMutation.isPending) {
      return;
    }

    deleteProductMutation.mutate(id);
  }

  function handleDeleteComment(commentId) {
    if (deleteCommentMutation.isPending) {
      return;
    }

    deleteCommentMutation.mutate(commentId);
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

  const currentVisibleTagCount = visibleTagCount ?? product.tags.length;

  const visibleTags = product.tags.slice(0, currentVisibleTagCount);
  const hiddenTagCount = product.tags.length - currentVisibleTagCount;

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

                      <button
                        className={styles.menuItem}
                        type="button"
                        onClick={handleOpenProductDeleteModal}
                      >
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

            <div className={styles.tagArea}>
              <h2 className={styles.infoTitle}>상품태그</h2>

              <div className={styles.tagList}>
                {visibleTags.map((tag) => (
                  <span className={styles.tag} key={tag}>
                    #{tag}
                  </span>
                ))}

                {hiddenTagCount > 0 && (
                  <button
                    className={styles.moreTagButton}
                    type="button"
                    onClick={() => {
                      setIsTagModalOpen(true);
                    }}
                  >
                    +{hiddenTagCount} 더보기
                  </button>
                )}
              </div>

              <div
                className={styles.tagWidthMeasure}
                ref={tagWidthRef}
                aria-hidden="true"
              >
                {product.tags.map((tag) => (
                  <span className={styles.tag} data-tag-width key={tag}>
                    #{tag}
                  </span>
                ))}
              </div>

              {isTagModalOpen && (
                <div className={styles.tagModal}>
                  <div className={styles.tagModalHeader}>
                    <p>전체 태그</p>

                    <button
                      className={styles.tagModalCloseButton}
                      type="button"
                      onClick={() => {
                        setIsTagModalOpen(false);
                      }}
                      aria-label="전체 태그 창 닫기"
                    >
                      x
                    </button>
                  </div>

                  <div className={styles.tagModalList}>
                    {product.tags.map((tag) => (
                      <span className={styles.tag} key={tag}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {/* 판매 글 작성자 영역*/}
            <div className={styles.ownerArea}>
              <div className={styles.ownerInfo}>
                <img
                  className={styles.profileImage}
                  src="/images/default_profile.png"
                  alt="판매자 프로필"
                />

                <div>
                  <p className={styles.productOwnerNickname}>
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
        {/* 댓글 작성자 영역 */}
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
                {editingCommentId === comment.id ? (
                  <div className={styles.editContent}>
                    <textarea
                      className={styles.editInput}
                      value={editContent}
                      onChange={(event) => setEditContent(event.target.value)}
                    />

                    <div className={styles.editBottom}>
                      <div className={styles.commentWriter}>
                        <img
                          className={styles.commentProfile}
                          src={
                            comment.writer.image ||
                            "/images/default_profile.png"
                          }
                          alt=""
                        />

                        <div>
                          <p className={styles.commentWriterNickname}>
                            {comment.writer.nickname}
                          </p>

                          <p className={styles.commentDate}>
                            {new Date(comment.createdAt).toLocaleDateString(
                              "ko-KR",
                            )}
                          </p>
                        </div>
                      </div>

                      <div className={styles.editButtons}>
                        <button
                          className={styles.editCancelButton}
                          type="button"
                          onClick={handleCancelEdit}
                        >
                          취소
                        </button>

                        <button
                          className={styles.editSubmitButton}
                          type="button"
                          onClick={handleUpdateComment}
                          disabled={
                            editContent.trim().length === 0 ||
                            updateCommentMutation.isPending
                          }
                        >
                          {updateCommentMutation.isPending
                            ? "수정 중..."
                            : "수정 완료"}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
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
                                currentMenuId === comment.id
                                  ? null
                                  : comment.id,
                              );
                            }}
                          >
                            <img src="/images/menu_button.png" alt="" />
                          </button>

                          {/* 같은 댓글 메뉴를 다시 누르면 닫고, 다른 댓글을 누르면 그 댓글 메뉴를 연다는 의미 */}
                          {openCommentMenuId === comment.id && (
                            <div className={styles.commentMenu}>
                              <button
                                className={styles.menuItem}
                                type="button"
                                onClick={() => handleStartEdit(comment)}
                              >
                                수정하기
                              </button>

                              <button
                                className={styles.menuItem}
                                type="button"
                                onClick={() => handleDeleteComment(comment.id)}
                                disabled={deleteCommentMutation.isPending}
                              >
                                {deleteCommentMutation.isPending
                                  ? "삭제 중..."
                                  : "삭제하기"}
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className={styles.commentWriter}>
                      <img
                        className={styles.commentProfile}
                        src={
                          comment.writer.image || "/images/default_profile.png"
                        }
                        alt=""
                      />

                      <div>
                        <p className={styles.commentWriterNickname}>
                          {comment.writer.nickname}
                        </p>

                        <p className={styles.commentDate}>
                          {new Date(comment.createdAt).toLocaleDateString(
                            "ko-KR",
                          )}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
        </div>
      </section>

      <Link className={styles.backButton} href="/items">
        <span>목록으로 돌아가기</span>
        <img src="/images/ic_back.png" alt="" />
      </Link>

      {isProductDeleteModalOpen && (
        <div className={styles.deleteModalBackground}>
          <div className={styles.deleteModal}>
            <span className={styles.deleteModalIcon}>
              <img src="/images/check.png" alt="" />
            </span>

            <p className={styles.deleteModalMessage}>
              정말로 상품을 삭제하시겠어요?
            </p>

            <div className={styles.deleteModalButtons}>
              <button
                className={styles.deleteCancelButton}
                type="button"
                onClick={handleCloseProductDeleteModal}
              >
                취소
              </button>

              <button
                className={styles.deleteConfirmButton}
                type="button"
                onClick={handleConfirmProductDelete}
                disabled={deleteProductMutation.isPending}
              >
                {deleteProductMutation.isPending ? "삭제 중..." : "네"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
