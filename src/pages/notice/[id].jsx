import Link from 'next/link';
import Commentcard from "@/components/commentcard";
import Footer from "@/components/Footer";
import Gnb from "@/components/gnb";
import style from "@/styles/[id].module.css"
import Pagination from '@/components/Pagination.jsx';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { formatDate } from '@/utils/time.js';

export default function NoticeDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [notice, setNotice] = useState(null);
  const [comments, setComments] = useState([]);
  const [nickname, setNickname] = useState("");
  const [content, setContent] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);


  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 5;

  async function handleSubmit() {
    if (!nickname.trim() || !content.trim()) return;
    // 추후 api 명세 갱신 시 추가 개발 필요
    await fetch(`/api/notice/${id}/comment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ author: nickname, content }),
    });

    setNickname("");
    setContent("");

    const res = await fetch(`/api/notice/${id}/comment`);
    setComments(await res.json());
    setCurrentPage(1);
  }

  useEffect(() => {
    if (id) {
      fetch(`/api/notice/${id}`)
        .then((res) => res.json())
        .then((data) => setNotice(data));

      setComments([]);
    }
  }, [id]);

  if (!notice) return <p>로딩 중...</p>;

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);
  const totalPages = Math.ceil(comments.length / commentsPerPage);

  return (
    <>
      <Gnb />
      <div className={style.wrap}>
        <div className={style.frame}>
          <div className={style.content_wrap}>
            <div className={style.notice_wrap}>
              <div className={style.notice_head}>
                <div className={style.head_top}>
                  <span>{notice.title}</span>
                  <img
                    src="/assets/ic_kebab.svg"
                    alt="kebob"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    style={{ cursor: "pointer" }}
                  />
                  {isDropdownOpen && (
                    <ul className={style.dropdown}>
                      <li
                        onClick={async () => {
                          try {
                            const token = localStorage.getItem("accessToken");
                            const res = await fetch(`/api/notice/${id}`, {
                              method: "PATCH", // 수정 요청 대신 권한 체크용으로 호출
                              headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`,
                              },
                              body: JSON.stringify({}), // 실제 수정은 edit 페이지에서 진행
                            });

                            if (res.status === 403) {
                              alert("본인이 작성한 글만 수정할 수 있습니다.");
                            } else if (res.ok) {
                              // 권한 통과 → 수정 페이지로 이동
                              router.push(`/notice/${id}/edit`);
                            } else {
                              const err = await res.json();
                              alert("수정 권한 확인 중 오류: " + err.error);
                            }
                          } catch (error) {
                            console.error("수정 권한 확인 에러:", error);
                            alert("수정 권한 확인 중 문제가 발생했습니다.");
                          }
                        }}
                      >
                        수정
                      </li>
                      <li
                        onClick={async () => {
                          try {
                            const token = localStorage.getItem("accessToken"); // 로그인 시 저장한 토큰
                            const res = await fetch(`/api/notice/${id}`, {
                              method: "DELETE",
                              headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`,
                              },
                            });
                            if (res.ok) {
                              alert("게시글이 삭제되었습니다.");
                              router.push("/notice");
                            } else if (res.status === 401) {
                              alert("로그인이 필요합니다.");
                            } else if (res.status === 403) {
                              alert("본인이 작성한 글만 삭제할 수 있습니다.");
                            } else {
                              const err = await res.json();
                              alert("삭제 중 오류: " + err.error);
                            }
                          } catch (error) {
                            console.error("삭제 에러:", error);
                            alert("삭제 중 문제가 발생했습니다.");
                          }
                        }}
                      >
                        삭제
                      </li>
                    </ul>
                  )}
                </div>
                <div className={style.head_bottom}>
                  <div className={style.img_name_date}>
                    <img src="/assets/ic_profile.svg" alt="kebob" />
                    <span id={style.notice_author}>{notice.writer.nickname}</span>
                    <span id={style.notice_postedAt}>{formatDate(notice.createdAt)}</span>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="1" height="34" viewBox="0 0 1 34" fill="none">
                    <path d="M0.5 0V34" stroke="#E5E7EB" />
                  </svg>
                  <div className={style.likearea}>
                    <div className={style.heart_likes}>
                      <img src="/assets/ic_heart.svg" alt="heart" />
                      <span>{notice.likeCount}</span>
                    </div>
                  </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1" viewBox="0 0 1200 1" fill="none">
                  <path d="M0 0.5H1200" stroke="#E5E7EB" />
                </svg>
              </div>
              <div className={style.notice_content}>
                <span>{notice.content}</span>
              </div>
            </div>
            <div className={style.body_comment}>
              <div className={style.notice_body}>
                <div className={style.span_textarea}>
                  <span>댓글달기</span>
                  <form>
                    <input
                      placeholder="닉네임을 입력해주세요"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                    />
                    <textarea
                      placeholder="내용을 입력해주세요"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </form>
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={!nickname.trim() || !content.trim()}
                >
                  <span>등록</span>
                </button>
              </div>
              {comments.length > 0 ? (
                <div className={style.comment_wrap}>
                  {currentComments.map((c) => (
                    <Commentcard
                    type={`notice`}
                      key={c.id}
                      id={c.id}
                      title={c.content}
                      author={c.author}
                      date={c.postedAt}
                      parentId={id}
                      onUpdated={(commentId, newContent) => {
                        setComments((prev) =>
                          prev.map((comment) =>
                            comment.id === commentId ? { ...comment, content: newContent } : comment
                          )
                        );
                      }}
                    />
                  ))}
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
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
