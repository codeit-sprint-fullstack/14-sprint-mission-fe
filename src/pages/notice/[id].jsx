import Link from 'next/link';
import Commentcard from "@/components/commentcard";
import Footer from "@/components/Footer";
import Gnb from "@/components/gnb";
import style from "@/styles/[id].module.css"
import Pagination from '@/components/Pagination.jsx';
import { useRouter } from "next/router";
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { formatDate } from '@/utils/time.js';
import api from '@/utils/api';
import WarningModal from '@/components/warningmodal';
import { toast } from 'react-toastify';

export default function NoticeDetail() {
  const router = useRouter();
  const { id } = router.query;
  const queryClient = useQueryClient();

  const [comment, setComment] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [like, setLike] = useState(false);

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // 상품 상세 조회
  const {
    data: notice,
    isLoading: noticeLoading,
    error: noticeError,
  } = useQuery({
    queryKey: ["item", id],
    queryFn: async () => {
      const res = await api.get(`/notice/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  // 댓글 조회
  const {
    data: commentsData,
    isLoading: commentsLoading,
    error: commentsError,
  } = useQuery({
    queryKey: ["comments", id],
    queryFn: async () => {
      const res = await api.get(`/notice/${id}/comment?limit=10`);
      return res.data;
    },
    enabled: !!id,
  });

  const comments = commentsData?.list || [];
  const currentComments = comments.slice((currentPage - 1) * 10, currentPage * 10);

  // 댓글 등록 Mutation
  const registerComment = useMutation({
    mutationFn: async () => {
      const res = await api.post(`/notice/${id}/comment`, { content: comment });
      return res.data;
    },
    onSuccess: () => {
      toast("댓글이 등록되었습니다!");
      setComment("");
      queryClient.invalidateQueries(["comments", id]); // 댓글 목록 갱신
    },
    onError: () => toast("댓글 등록 중 오류 발생"),
  });

  // 좋아요 Mutation
  const toggleLike = useMutation({
    mutationFn: async (liked) => {
      if (!liked) {
        // 좋아요 등록
        const res = await api.post(`/notice/${id}/favorite`);
        return res.data;
      } else {
        // 좋아요 취소
        const res = await api.delete(`/notice/${id}/favorite`);
        return res.data;
      }
    },
    onMutate: async (liked) => {
      // Optimistic Update: 클릭 즉시 UI 반영
      await queryClient.cancelQueries(["item", id]);
      const prevItem = queryClient.getQueryData(["item", id]);

      queryClient.setQueryData(["item", id], (old) => ({
        ...old,
        isFavorite: !liked,
        favoriteCount: liked ? old.favoriteCount - 1 : old.favoriteCount + 1,
      }));

      return { prevItem };
    },
    onError: (err, variables, context) => {
      // 실패 시 롤백
      queryClient.setQueryData(["item", id], context.prevItem);
      toast.error("백엔드 curl에 auth 인증 과정이 없어 favorite 갱신이 불가합니다.");
    },
    onSuccess: (updated) => {
      queryClient.setQueryData(["item", id], (prev) => ({
        ...prev,
        isFavorite: updated.isFavorite,
        favoriteCount: updated.favoriteCount,
      }));
    },
    onSettled: () => {
      // 서버와 최종 동기화
      queryClient.invalidateQueries(["item", id]);
    },
  });

  // 삭제 Mutation
  const deleteItem = useMutation({
    mutationFn: async () => {
      const res = await api.delete(`/notice/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast("게시글이 삭제되었습니다.");
      router.push("/notice");
    },
    onError: () => toast("삭제 중 오류 발생"),
  });

  // 게시글 수정
  const handleEdit = async () => {
    try {
      const res = await api.patch(`/notice/${id}`, {});
      if (res.status === 403) {
        toast("본인이 작성한 글만 수정할 수 있습니다.");
      } else if (res.status === 200) {
        router.push(`/notice/${id}/edit`);
      } else {
        toast("수정 권한 확인 중 오류");
      }
    } catch (error) {
      console.error("수정 권한 확인 에러:", error);
      toast.error("수정 권한 확인 중 문제가 발생했습니다.");
    }
  };

  // 게시글 삭제
  const handlePermit = async () => {
    try {
      await api.delete(`/notice/${id}`); // 실제 삭제 API 호출
      toast("상품이 삭제되었습니다.");
      setIsModalOpen(false);
      router.push("/notice"); // 목록 페이지로 이동
    } catch (error) {
      console.error("삭제 에러:", error);
      toast.error("상품 삭제 중 문제가 발생했습니다.");
      setIsModalOpen(false);
    }
  };



  if (noticeLoading || commentsLoading) return <p>로딩중...</p>;
  if (noticeError || commentsError) return <p>에러 발생</p>;

  return (
    <>
      <Gnb />
      <div className={style.wrap}>
        <div className={style.frame}>
          <div className={style.content_wrap}>
            <div className={style.notice_wrap}>
              <div className={style.notice_head}>
                <div className={style.head_top}>
                  <span>{notice?.title}</span>
                  <img
                    src="/assets/ic_kebab.svg"
                    alt="kebob"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    style={{ cursor: "pointer" }}
                  />
                  {isDropdownOpen && (
                    <ul className={style.dropdown}>
                      <li onClick={handleEdit}>수정</li>
                      <li onClick={handleDeleteClick}>삭제</li>
                    </ul>
                  )}
                  {isModalOpen && (
                    <WarningModal
                      message="정말로 상품을 삭제하시겠어요?"
                      onPermit={handlePermit}
                      onClose={handleCloseModal}
                    />
                  )}
                </div>
                <div className={style.head_bottom}>
                  <div className={style.img_name_date}>
                    <img src="/assets/ic_profile.svg" alt="kebob" />
                    <span id={style.notice_author}>{notice?.writer.nickname}</span>
                    <span id={style.notice_postedAt}>{formatDate(notice?.createdAt)}</span>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="1" height="34" viewBox="0 0 1 34" fill="none">
                    <path d="M0.5 0V34" stroke="#E5E7EB" />
                  </svg>
                  <div>
                    <div className={style.line_button}>
                      <button
                        className={style.likebutton}
                        onClick={() => toggleLike.mutate(notice.isFavorite)}
                      >
                        <div className={style.heart_likes}>
                          <img
                            src={notice?.isFavorite ? "/assets/ic_heart_on.svg" : "/assets/ic_heart.svg"}
                            alt="heart"
                          />
                          <span>{notice?.likeCount ?? 0}</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1" viewBox="0 0 1200 1" fill="none">
                  <path d="M0 0.5H1200" stroke="#E5E7EB" />
                </svg>
              </div>
              <div className={style.notice_content}>
                <span>{notice?.content}</span>
              </div>
            </div>
            <div className={style.body_comment}>
              <div className={style.notice_body}>
                <div className={style.span_textarea}>
                  <span>댓글달기</span>
                  <form>
                    <textarea
                      placeholder="내용을 입력해주세요"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </form>
                </div>
                <button
                  onClick={() => registerComment.mutate(comment)}
                  disabled={!comment.trim()}
                >
                  <span>등록</span>
                </button>
              </div>
              {comments.length > 0 ? (
                <div className={style.comment_wrap}>
                  {currentComments.map((c) => (
                    <Commentcard
                      key={c.id}
                      id={c.id}
                      type="notice"
                      title={c.content}
                      author={c.writer.nickname}
                      date={c.createdAt}
                      parentId={id}
                      onUpdated={(commentId, newContent) => {
                        queryClient.setQueryData(["comments", id], (old) => {
                          if (!old) return old;
                          return {
                            ...old,
                            list: old.list.map((comment) =>
                              comment.id === commentId ? { ...comment, content: newContent } : comment
                            ),
                          };
                        });
                      }}

                      onDeleted={() => queryClient.invalidateQueries(["comments", id])}
                    />
                  ))}
                </div>
              ) : (
                <div className={style.empty_comment}>
                  <img src="/assets/img_reply_empty.svg" alt='empty' />
                  <span>아직 댓글이 없어요,<br />지금 댓글을 달아보세요!</span>
                </div>
              )}
            </div>
          </div>
          <Link href="/notice">
            <button id={style.framebutton}>
              <div className={style.backlist}>
                <span>목록으로 돌아가기</span>
                <img src="/assets/ic_back.svg" alt="back" />
              </div>
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
