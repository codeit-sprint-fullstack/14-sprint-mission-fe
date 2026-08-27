import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Footer from "@/components/Footer";
import Gnb from "@/components/gnb";
import style from "@/styles/create.module.css";
import api from "@/utils/api";
import { uploadImage } from "@/utils/imageupload";

const MAX_IMAGES = 3;

export default function CreateNotice() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // { file, preview } 배열 (최대 3)
  const [images, setImages] = useState([]);
  const [imageError, setImageError] = useState("");
  const fileInputRef = useRef(null);
  const [submitting, setSubmitting] = useState(false);

  const imagesFull = images.length >= MAX_IMAGES;
  const isDisabled = title.trim() === "" || content.trim() === "" || submitting;

  // 파일 선택 → 미리보기 목록에 추가 (최대 3개)
  const handleAddImages = (e) => {
    const picked = Array.from(e.target.files || []);
    e.target.value = ""; // 같은 파일 재선택 가능
    if (picked.length === 0) return;

    const room = MAX_IMAGES - images.length;
    if (room <= 0) {
      setImageError(`이미지는 최대 ${MAX_IMAGES}개까지 등록할 수 있습니다.`);
      return;
    }
    const next = picked.slice(0, room).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...next]);
    setImageError(picked.length > room ? `이미지는 최대 ${MAX_IMAGES}개까지 등록할 수 있습니다.` : "");
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => {
      URL.revokeObjectURL(prev[index]?.preview);
      return prev.filter((_, i) => i !== index);
    });
    setImageError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!localStorage.getItem("nickname")) {
      toast.error("로그인 후 이용 가능합니다.");
      return;
    }
    if (isDisabled) return;

    setSubmitting(true);
    try {
      // 1. 선택한 이미지 전부 업로드 → URL 배열
      const uploadedUrls = await Promise.all(images.map(({ file }) => uploadImage(file)));

      // 2. 게시글 등록
      const res = await api.post("/notice", {
        images: uploadedUrls,
        content,
        title,
      });

      if (res.status === 200 || res.status === 201) {
        toast("게시글이 등록되었습니다!");
        router.push(`/notice/${res.data.id}`);
      } else {
        toast.error("등록 실패: " + (res.data?.error || "알 수 없는 오류"));
      }
    } catch (error) {
      console.error("등록 에러:", error);
      toast.error("등록 중 문제가 발생했습니다.");
    } finally {
      setSubmitting(false);
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
                <span>{submitting ? "등록 중..." : "등록"}</span>
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className={style.form_wrap}>
                <span>이미지 (최대 {MAX_IMAGES}개)</span>
                <div className={style.img_wrap}>
                  <div
                    className={`${style.img_upload} ${imagesFull ? style.img_upload_disabled : ""}`}
                    onClick={() => {
                      if (imagesFull) {
                        setImageError(`이미지는 최대 ${MAX_IMAGES}개까지 등록할 수 있습니다.`);
                        return;
                      }
                      fileInputRef.current?.click();
                    }}
                  >
                    <div className={style.upload_wrap}>
                      <img src="/assets/ic_plus.svg" alt="plus" />
                      <span>{`${images.length} / ${MAX_IMAGES}`}</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      disabled={imagesFull}
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={handleAddImages}
                    />
                  </div>

                  {images.map((img, index) => (
                    <div key={img.preview} className={style.img_sample}>
                      <img src={img.preview} alt={`미리보기 ${index + 1}`} className={style.background} />
                      <img
                        src="/assets/ic_X.svg"
                        alt="삭제"
                        className={style.delete}
                        onClick={() => handleRemoveImage(index)}
                      />
                    </div>
                  ))}
                </div>
                {imageError && <p className={style.errorMessage}>{imageError}</p>}
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
      <Footer />
    </>
  );
}
