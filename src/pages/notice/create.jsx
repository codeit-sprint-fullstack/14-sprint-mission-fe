import { useState } from "react";
import { useRouter } from "next/router";
import Footer from "@/components/Footer";
import Gnb from "@/components/gnb";
import style from "@/styles/create.module.css";

export default function CreateNotice() {
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const isDisabled = title.trim() === "" || content.trim() === "" || image.trim() === "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/articles`, {
        method: "POST",
        headers: {
          "accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image, content, title }),
      });

      if (res.ok) {
        const newNotice = await res.json();
        alert("게시글이 등록되었습니다!");
        router.push(`/notice/${newNotice.id}`);
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
      <Gnb />
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
              <div className={style.form_wrap}>
                <span>*이미지 URL</span>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://example.com/image.png"
                />
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

