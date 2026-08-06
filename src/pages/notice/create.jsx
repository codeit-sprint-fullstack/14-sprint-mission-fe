import { useState } from "react";
import Footer from "@/components/Footer";
import Gnb from "@/components/gnb";
import style from "@/styles/create.module.css";

export default function CreateNotice() {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const isDisabled = title.trim() === "" || content.trim() === "" || author.trim() === "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/notice/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author, title, content }),
      });

      if (res.ok) {
        alert("게시글이 등록되었습니다!");
        window.location.href = "/notice"; // 등록 후 목록으로 이동
      } else {
        const err = await res.json();
        alert("등록 실패: " + err.error);
      }
    } catch (error) {
      console.error("등록 에러:", error);
    }
  };

  return (
    <>
      <Gnb/>
      <main>
        <div className={style.wrap}>
          <div className={style.content_wrap}>
            <div className={style.content_head}>
              <span>게시글 쓰기</span>
              <button disabled={isDisabled} onClick={handleSubmit}>
                <span>등록</span>
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className={style.form_wrap}>
                <span>*임시용 닉네임</span>
                <input
                  type="text"
                  placeholder="닉네임을 입력해주세요"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </div>
              <div className={style.form_wrap}>
                <span>*제목</span>
                <input
                  type="text"
                  placeholder="제목을 입력해주세요"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className={style.form_wrap}>
                <span>*내용</span>
                <textarea
                  placeholder="내용을 입력해주세요"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer/>
    </>
  );
}

