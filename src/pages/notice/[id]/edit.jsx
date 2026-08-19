import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Footer from "@/components/Footer.jsx";
import Gnb from "@/components/gnb.jsx";
import style from "@/styles/create.module.css";
import api from "@/utils/api"; // axios 인스턴스

export default function EditNotice() {
  const router = useRouter();
  const { id } = router.query;

  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const isDisabled = title.trim() === "" || content.trim() === "" || image.trim() === "";

  useEffect(() => {
    if (id) {
      api.get(`/notice/${id}`)
        .then((res) => {
          setTitle(res.data.title);
          setContent(res.data.content);
          setImage(res.data.image);
        })
        .catch((err) => {
          console.error("게시글 불러오기 에러:", err);
          alert("게시글을 불러오지 못했습니다.");
        });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.patch(`/notice/${id}`, {
        image,
        title,
        content,
      });

      if (res.status === 200) {
        alert("게시글이 수정되었습니다!");
        router.push(`/notice/${id}`);
      } else {
        alert("수정 실패: " + (res.data?.error || "알 수 없는 오류"));
      }
    } catch (error) {
      console.error("수정 에러:", error);
      alert("수정 중 문제가 발생했습니다.");
    }
  };

  return (
    <>
      <Gnb />
      <main>
        <div className={style.wrap}>
          <div className={style.content_wrap}>
            <div className={style.content_head}>
              <span>게시글 수정</span>
              <button disabled={isDisabled} onClick={handleSubmit}>
                <span>저장</span>
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
