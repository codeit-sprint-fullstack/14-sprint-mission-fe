import Link from 'next/link';
import Commentcard from "@/components/commentcard";
import Footer from "@/components/Footer";
import Gnb from "@/components/gnb";
import style from "@/styles/[id].module.css"
import Pagination from '@/components/Pagination.jsx';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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

      fetch(`/api/notice/${id}/comment`)
        .then((res) => res.json())
        .then((data) => setComments(data));
    }
  }, [id]);

  if (!notice) return <p>로딩 중...</p>;

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);
  const totalPages = Math.ceil(comments.length / commentsPerPage);

  return (
    <>
      <Gnb/>
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
                          onClick={() => {
                            router.push(`/notice/${id}/edit`);
                          }}
                        >
                          수정
                        </li>
                        <li
                          onClick={async () => {
                            const res = await fetch(`/api/notice/${id}`, {
                              method: "DELETE",
                            });
                            if (res.ok) {
                              alert("게시글이 삭제되었습니다.");
                              router.push("/notice");
                            } else {
                              alert("삭제 중 오류가 발생했습니다.");
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
                    <img src="/assets/ic_profile.svg" alt="kebob"/>
                    <span id={style.notice_author}>{notice.author}</span>
                    <span id={style.notice_postedAt}>{notice.postedAt}</span>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="1" height="34" viewBox="0 0 1 34" fill="none">
                    <path d="M0.5 0V34" stroke="#E5E7EB"/>
                  </svg>
                  <div className={style.likearea}>
                    <div className={style.heart_likes}>
                      <img src="/assets/ic_heart.svg" alt="heart"/>
                      <span>{notice.likes}</span>
                    </div>
                  </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1" viewBox="0 0 1200 1" fill="none">
                  <path d="M0 0.5H1200" stroke="#E5E7EB"/>
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
                      key={c.id}
                      id={c.id}
                      title={c.content}
                      author={c.author}
                      date={c.postedAt}
                      noticeId={id}
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
                  <img src="/assets/img_reply_empty.svg" alt='empty'/>
                  <span>아직 댓글이 없어요,<br/>지금 댓글을 달아보세요!</span>
                </div>
              )}
            </div>
          </div>
          <Link href="/notice">
            <button id={style.framebutton}>
              <div className={style.backlist}>
                <span>목록으로 돌아가기</span>
                <img src="/assets/ic_back.svg" alt="back"/>
              </div>
            </button>
          </Link>
        </div>
      </div>
      <Footer/>
    </>
  );
}
