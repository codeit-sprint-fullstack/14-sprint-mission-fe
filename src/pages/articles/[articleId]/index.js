import { useEffect, useState } from "react";

import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "@/styles/ArticleDetail.module.css";

// API 날짜를 연도.월.일 형식으로 변환
const formatDate = (dateString) => {
  const [date] = dateString.split("T");

  return date.replaceAll("-", ".");
};

// 게시글 ID에 해당하는 상세 페이지
export default function ArticleDetailPage() {
  const router = useRouter();
  const { articleId } = router.query;

  // API에서 받은 게시글 정보 저장
  const [article, setArticle] = useState(null);

  // 게시글 요청 진행 상태 저장
  const [isLoading, setIsLoading] = useState(true);

  // 게시글 요청 오류 메시지 저장
  const [errorMessage, setErrorMessage] = useState("");

  // 게시글 삭제 진행 상태 저장
  const [isDeleting, setIsDeleting] = useState(false);

  // 게시글 삭제 오류 메시지 저장
  const [deleteErrorMessage, setDeleteErrorMessage] = useState("");

  // 게시글 메뉴 열림 상태 저장
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // API에서 받은 댓글 목록 저장
  const [comments, setComments] = useState([]);

  // 댓글 목록 요청 진행 상태 저장
  const [isCommentsLoading, setIsCommentsLoading] = useState(true);

  // 댓글 목록 요청 오류 메시지 저장
  const [commentsErrorMessage, setCommentsErrorMessage] = useState("");

  // 작성 중인 댓글 내용 저장
  const [commentContent, setCommentContent] = useState("");

  // 댓글 등록 진행 상태 저장
  const [isCommentSubmitting, setIsCommentSubmitting] = useState(false);

  // 댓글 등록 오류 메시지 저장
  const [commentSubmitErrorMessage, setCommentSubmitErrorMessage] =
    useState("");

  // 현재 열려 있는 댓글 메뉴 ID 저장
  const [openCommentMenuId, setOpenCommentMenuId] = useState(null);

  // 삭제 중인 댓글 ID 저장
  const [deletingCommentId, setDeletingCommentId] = useState(null);

  // 댓글 삭제 오류 메시지 저장
  const [commentDeleteErrorMessage, setCommentDeleteErrorMessage] =
    useState("");

  // 현재 수정 중인 댓글 ID 저장
  const [editingCommentId, setEditingCommentId] = useState(null);

  // 수정 중인 댓글 내용 저장
  const [editingCommentContent, setEditingCommentContent] = useState("");

  // 댓글 수정 진행 상태 저장
  const [isCommentEditing, setIsCommentEditing] = useState(false);

  // 댓글 수정 오류 메시지 저장
  const [commentEditErrorMessage, setCommentEditErrorMessage] =
    useState("");

  // 주소의 게시글 ID가 준비되면 상세 정보 요청
  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const fetchArticle = async () => {
      try {
        const response = await axios.get(`/api/articles/${articleId}`);

        setArticle(response.data);
      } catch (error) {
        console.error("게시글을 불러오지 못했습니다.", error);

        // 게시글이 없거나 요청에 실패한 경우 처리
        setErrorMessage(
          error.response?.data?.message ??
          "게시글을 불러오지 못했습니다.",
        );
      } finally {
        // API 요청 성공 여부와 관계없이 로딩 종료
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [articleId, router.isReady]);

  // 주소의 게시글 ID가 준비되면 댓글 목록 요청
  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const fetchComments = async () => {
      try {
        setIsCommentsLoading(true);
        setCommentsErrorMessage("");

        // 현재 게시글의 댓글 목록 요청
        const response = await axios.get(
          `/api/articles/${articleId}/comments`,
        );

        // API에서 받은 댓글 배열 저장
        setComments(response.data.list);
      } catch (error) {
        console.error("댓글을 불러오지 못했습니다.", error);

        // 댓글 목록 요청 실패 메시지 저장
        setCommentsErrorMessage(
          error.response?.data?.message ??
          "댓글을 불러오지 못했습니다.",
        );
      } finally {
        // API 요청 성공 여부와 관계없이 로딩 종료
        setIsCommentsLoading(false);
      }
    };

    fetchComments();
  }, [articleId, router.isReady]);

  // 새 댓글 등록 요청 처리
  const handleCommentSubmit = async () => {
    const trimmedContent = commentContent.trim();

    // 빈 댓글 또는 등록 진행 중인 경우 요청 차단
    if (!trimmedContent || isCommentSubmitting) {
      return;
    }

    try {
      setIsCommentSubmitting(true);
      setCommentSubmitErrorMessage("");

      // 현재 게시글에 새 댓글 등록 요청
      const response = await axios.post(
        `/api/articles/${articleId}/comments`,
        {
          content: trimmedContent,
        },
      );

      // 새 댓글을 기존 댓글 목록 맨 앞에 추가
      setComments((prevComments) => [
        response.data,
        ...prevComments,
      ]);

      // 등록 성공 후 입력창 비우기
      setCommentContent("");
    } catch (error) {
      console.error("댓글 등록 실패:", error);

      setCommentSubmitErrorMessage(
        error.response?.data?.message ??
        "댓글을 등록하지 못했습니다.",
      );
    } finally {
      setIsCommentSubmitting(false);
    }
  };

  // 댓글 수정 요청 처리
  const handleCommentEdit = async (commentId) => {
    const trimmedContent = editingCommentContent.trim();

    // 빈 댓글 또는 수정 진행 중인 경우 요청 차단
    if (!trimmedContent || isCommentEditing) {
      return;
    }

    try {
      setIsCommentEditing(true);
      setCommentEditErrorMessage("");

      // 선택한 댓글 수정 API 요청
      const response = await axios.patch(
        `/api/articles/${articleId}/comments/${commentId}`,
        {
          content: trimmedContent,
        },
      );

      // 수정된 댓글을 현재 댓글 목록에 반영
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId
            ? response.data
            : comment,
        ),
      );

      // 댓글 수정 상태 종료
      setEditingCommentId(null);
      setEditingCommentContent("");
    } catch (error) {
      console.error("댓글 수정 실패:", error);

      setCommentEditErrorMessage(
        error.response?.data?.message ??
        "댓글을 수정하지 못했습니다.",
      );
    } finally {
      setIsCommentEditing(false);
    }
  };

  // 댓글 삭제 요청 처리
  const handleCommentDelete = async (commentId) => {
    // 같은 댓글의 삭제 요청이 진행 중이면 중복 요청 차단
    if (deletingCommentId === commentId) {
      return;
    }

    // 사용자가 삭제를 취소한 경우 요청 중단
    const shouldDelete = window.confirm(
      "댓글을 삭제하시겠습니까?",
    );

    if (!shouldDelete) {
      return;
    }

    try {
      setDeletingCommentId(commentId);
      setCommentDeleteErrorMessage("");

      // 선택한 댓글 삭제 API 요청
      await axios.delete(
        `/api/articles/${articleId}/comments/${commentId}`,
      );

      // 삭제한 댓글을 현재 댓글 목록에서 제거
      setComments((prevComments) =>
        prevComments.filter(
          (comment) => comment.id !== commentId,
        ),
      );

      // 댓글 메뉴 닫기
      setOpenCommentMenuId(null);
    } catch (error) {
      console.error("댓글 삭제 실패:", error);

      setCommentDeleteErrorMessage(
        error.response?.data?.message ??
        "댓글을 삭제하지 못했습니다.",
      );
    } finally {
      setDeletingCommentId(null);
    }
  };

  // 게시글 삭제 요청 처리
  const handleDelete = async () => {
    // 삭제 진행 중이면 중복 요청 차단
    if (isDeleting) {
      return;
    }

    // 사용자가 삭제를 취소한 경우 요청 중단
    const shouldDelete = window.confirm(
      "게시글을 삭제하시겠습니까? 삭제한 게시글은 복구할 수 없습니다.",
    );

    if (!shouldDelete) {
      return;
    }

    try {
      setIsDeleting(true);
      setDeleteErrorMessage("");

      // 현재 게시글 삭제 API 요청
      await axios.delete(`/api/articles/${articleId}`);

      // 삭제 완료 후 자유게시판 목록으로 이동
      await router.push("/articles");
    } catch (error) {
      console.error("게시글 삭제 실패:", error);

      setDeleteErrorMessage(
        error.response?.data?.message ??
        "게시글을 삭제하지 못했습니다.",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return <p>게시글을 불러오는 중입니다.</p>;
  }

  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  // 게시글 ID를 활용해 임시 작성자와 좋아요 개수 생성
  const nickname = `판다${article.id}`;
  const likeCount = (article.id * 7) % 100;

  return (
    <>
      {/* 게시글 제목을 브라우저 탭에 표시 */}
      <Head>
        <title>{article.title} | 판다마켓</title>
        <meta
          name="description"
          content={article.content}
        />
      </Head>

      {/* 게시글 상세 내용 표시 */}
      <main className={styles.page}>
        <article className={styles.article}>
          {/* 게시글 제목과 수정 버튼 영역 */}
          <div className={styles.articleHeader}>
            <h1 className={styles.title}>{article.title}</h1>

            {/* 게시글 수정·삭제 메뉴 */}
            <div className={styles.articleActions}>
              {/* 점 3개 버튼 클릭 시 메뉴 열고 닫기 */}
              <button
                className={styles.menuButton}
                type="button"
                aria-label="게시글 메뉴 열기"
                aria-expanded={isMenuOpen}
                onClick={() => setIsMenuOpen((prev) => !prev)}
              >
                <img
                  src="/img/ic_kebab.svg"
                  alt=""
                />
              </button>

              {/* 메뉴가 열린 경우에만 수정·삭제 항목 표시 */}
              {isMenuOpen && (
                <div className={styles.menuDropdown}>
                  <Link
                    className={styles.menuItem}
                    href={`/articles/${article.id}/edit`}
                  >
                    수정하기
                  </Link>

                  <button
                    className={styles.menuItem}
                    type="button"
                    disabled={isDeleting}
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleDelete();
                    }}
                  >
                    {isDeleting ? "삭제 중..." : "삭제하기"}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* 작성자, 작성일, 좋아요 정보 표시 */}
          <div className={styles.articleInfo}>
            {/* 작성자 프로필 영역 */}
            <div className={styles.authorInfo}>
              <img
                className={styles.profileImage}
                src="/img/ic_profile.svg"
                alt=""
              />

              <span className={styles.nickname}>{nickname}</span>

              <span className={styles.date}>
                {formatDate(article.createdAt)}
              </span>
            </div>

            {/* 작성자 정보와 좋아요 영역 구분선 */}
            <div className={styles.infoDivider} />

            {/* 좋아요 정보 */}
            <div className={styles.likeInfo}>
              <span aria-hidden="true">♡</span>
              <span>{likeCount}</span>
            </div>
          </div>

          <p className={styles.content}>{article.content}</p>

          {/* 댓글 목록 영역 */}
          <section className={styles.commentSection}>
            <h2 className={styles.commentTitle}>댓글달기</h2>

            {/* 새 댓글 작성 영역 */}
            <div className={styles.commentForm}>
              <textarea
                className={styles.commentTextarea}
                placeholder="댓글을 입력해주세요."
                value={commentContent}
                onChange={(event) => setCommentContent(event.target.value)}
              />

              <button
                className={styles.commentSubmitButton}
                type="button"
                disabled={!commentContent.trim() || isCommentSubmitting}
                onClick={handleCommentSubmit}
              >
                {isCommentSubmitting ? "등록 중..." : "등록"}
              </button>

              {commentSubmitErrorMessage && (
                <p className={styles.commentSubmitError}>
                  {commentSubmitErrorMessage}
                </p>
              )}
            </div>

            {/* 댓글 요청 상태에 따라 화면 표시 */}
            {isCommentsLoading ? (
              <p>댓글을 불러오는 중입니다.</p>
            ) : commentsErrorMessage ? (
              <p>{commentsErrorMessage}</p>
            ) : comments.length === 0 ? (
              <p>등록된 댓글이 없습니다.</p>
            ) : (
              <ul className={styles.commentList}>
                {comments.map((comment) => (
                  <li
                    className={styles.commentItem}
                    key={comment.id}
                  >
                    {/* 댓글 내용과 메뉴 버튼 영역 */}
                    <div className={styles.commentContentRow}>
                      {/* 수정 상태에 따라 입력창 또는 기존 댓글 표시 */}
                      {editingCommentId === comment.id ? (
                        <div className={styles.commentEditForm}>
                          <textarea
                            className={styles.commentEditTextarea}
                            value={editingCommentContent}
                            onChange={(event) =>
                              setEditingCommentContent(event.target.value)
                            }
                          />

                          {commentEditErrorMessage && (
                            <p className={styles.commentEditError}>
                              {commentEditErrorMessage}
                            </p>
                          )}
                        </div>
                      ) : (
                        <p className={styles.commentContent}>
                          {comment.content}
                        </p>
                      )}

                      {/* 수정 중이 아닐 때 댓글 수정·삭제 메뉴 표시 */}
                      {editingCommentId !== comment.id && (
                        <div className={styles.articleActions}>
                          <button
                            className={styles.menuButton}
                            type="button"
                            aria-label="댓글 메뉴 열기"
                            aria-expanded={openCommentMenuId === comment.id}
                            onClick={() =>
                              setOpenCommentMenuId((prevId) =>
                                prevId === comment.id ? null : comment.id,
                              )
                            }
                          >
                            <img
                              src="/img/ic_kebab.svg"
                              alt=""
                            />
                          </button>

                          {/* 선택한 댓글의 메뉴만 표시 */}
                          {openCommentMenuId === comment.id && (
                            <div className={styles.menuDropdown}>
                              <button
                                className={styles.menuItem}
                                type="button"
                                onClick={() => {
                                  // 선택한 댓글을 수정 상태로 변경
                                  setEditingCommentId(comment.id);
                                  setEditingCommentContent(comment.content);

                                  // 댓글 메뉴 닫기
                                  setOpenCommentMenuId(null);
                                }}
                              >
                                수정하기
                              </button>

                              <button
                                className={styles.menuItem}
                                type="button"
                                disabled={deletingCommentId === comment.id}
                                onClick={() => handleCommentDelete(comment.id)}
                              >
                                {deletingCommentId === comment.id
                                  ? "삭제 중..."
                                  : "삭제하기"}
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* 댓글 작성자 정보와 수정 버튼 배치 */}
                    <div className={styles.commentBottomRow}>
                      {/* 댓글 작성자 정보 */}
                      <div className={styles.commentAuthorInfo}>
                        <img
                          className={styles.commentProfileImage}
                          src="/img/ic_profile.svg"
                          alt=""
                        />

                        <div className={styles.commentAuthorText}>
                          <span className={styles.commentNickname}>
                            판다{comment.id}
                          </span>

                          <span className={styles.commentDate}>
                            {formatDate(comment.createdAt)}
                          </span>
                        </div>
                      </div>

                      {/* 댓글 수정 중일 때만 취소·수정 완료 버튼 표시 */}
                      {editingCommentId === comment.id && (
                        <div className={styles.commentEditActions}>
                          <button
                            className={styles.commentEditCancelButton}
                            type="button"
                            onClick={() => {
                              setEditingCommentId(null);
                              setEditingCommentContent("");
                              setCommentEditErrorMessage("");
                            }}
                          >
                            취소
                          </button>

                          <button
                            className={styles.commentEditSubmitButton}
                            type="button"
                            disabled={
                              !editingCommentContent.trim() ||
                              isCommentEditing
                            }
                            onClick={() => handleCommentEdit(comment.id)}
                          >
                            {isCommentEditing ? "수정 중..." : "수정 완료"}
                          </button>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {commentDeleteErrorMessage && (
              <p>{commentDeleteErrorMessage}</p>
            )}
          </section>

          {deleteErrorMessage && (
            <p className={styles.deleteErrorMessage}>
              {deleteErrorMessage}
            </p>
          )}

        </article>
      </main>
    </>
  );
}