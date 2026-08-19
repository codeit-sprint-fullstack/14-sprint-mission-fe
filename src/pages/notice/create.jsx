import { useState } from "react";
import { useRouter } from "next/router";
import Footer from "@/components/Footer";
import Gnb from "@/components/gnb";
import style from "@/styles/create.module.css";
import api from "@/utils/api"; 
import { uploadImage } from "@/utils/imageupload";

export default function CreateNotice() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);

  const isDisabled = title.trim() === "" || content.trim() === "" || !file;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1. 이미지 업로드
      const uploadUrl = await uploadImage(file);

      // 2. 게시글 등록
      const res = await api.post("/notice", {
        image: uploadUrl,
        content,
        title,
      });

      if (res.status === 200 || res.status === 201) {
        const newNotice = res.data;
        alert("게시글이 등록되었습니다!");
        router.push(`/notice/${newNotice.id}`);
      } else {
        alert("등록 실패: " + (res.data?.error || "알 수 없는 오류"));
      }
    } catch (error) {
      console.error("등록 에러:", error);
      alert("등록 중 문제가 발생했습니다.");
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
                <span>*이미지 파일</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files[0])}
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
