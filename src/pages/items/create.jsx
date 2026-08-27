import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Footer from "@/components/Footer";
import Gnb from "@/components/gnb";
import style from "@/styles/items/create.module.css";
import { uploadImage } from "@/utils/imageupload";
import api from "@/utils/api";

export default function CreateProduct() {
  const router = useRouter();
  const MAX_IMAGES = 3;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // { file, preview } 배열 (최대 3)
  const [images, setImages] = useState([]);
  const [imageError, setImageError] = useState("");
  const fileInputRef = useRef(null);
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState([]);
  const [tagsFirst, setTagsFirst] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [titleFirst, setTitleFirst] = useState(true);
  const [contentFirst, setContentFirst] = useState(true);
  const [priceFirst, setPriceFirst] = useState(true);


  const imagesFull = images.length >= MAX_IMAGES;

  const isDisabled =
    title.trim() === "" ||
    content.trim() === "" ||
    price.trim() === "" ||
    images.length === 0 ||
    tags.length === 0;

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
    if (images.length === 0) {
      setImageError("이미지를 1개 이상 등록해주세요.");
      return;
    }

    try {
      // 1. 선택한 이미지 전부 업로드 → URL 배열
      const uploadedUrls = await Promise.all(images.map(({ file }) => uploadImage(file)));

      // 2. 상품 등록
      const res = await api.post("/items/create", {
        images: uploadedUrls,
        tags,
        price: Number(price),
        description: content,
        name: title,
      });

      toast("상품이 등록되었습니다!");
      router.push(`/items/${res.data.id}`);
    } catch (error) {
      console.error("등록 에러:", error);
      // 상태코드별 안내는 api 인터셉터가 이미 토스트로 처리
      if (!error?.__toastShown) toast.error("등록 중 문제가 발생했습니다.");
    }
  };



  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "" && inputValue.trim().length <= 5) {
      e.preventDefault();
      const newTag = inputValue.trim();
      if (!tags.some(tag => tag.toLowerCase() === newTag.toLowerCase())) {
        setTags([...tags, newTag]);
      }
      setInputValue("");
    }
  };

  const removeTag = (removeIndex) => {
    setTags(tags.filter((_, index) => index !== removeIndex));
  };

  return (
    <>
      <Gnb />
      <main>
        <div className={style.wrap}>
          <div className={style.content_wrap}>
            <div className={style.content_head}>
              <span>상품 등록</span>
              <button type="submit" disabled={isDisabled} className={style.submitButton} onClick={handleSubmit}>
                <span>등록</span>
              </button>

            </div>
            <form onSubmit={handleSubmit}>
              <div className={style.form_wrap}>
                <span>*이미지 (최대 {MAX_IMAGES}개)</span>
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
                {!imageError && images.length === 0 && (
                  <p className={style.errorMessage}>이미지를 1개 이상 등록해주세요</p>
                )}
              </div>
              <div className={style.form_wrap}>
                <span>*제목</span>
                <input
                  type="text"
                  placeholder="제목을 입력해주세요"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onFocus={() => setTitleFirst(false)}
                  onBlur={() => setTitleFirst(true)}
                />
                {!titleFirst && title.trim() === "" && (
                  <p className={style.errorMessage}>제목을 입력해주세요</p>
                )}
              </div>
              <div className={style.form_wrap}>
                <span>*내용</span>
                <textarea
                  placeholder="내용을 입력해주세요"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  onFocus={() => setContentFirst(false)}
                  onBlur={() => setContentFirst(true)}
                />
                {!contentFirst && content.trim() === "" && (
                  <p className={style.errorMessage}>내용을 입력해주세요</p>
                )}
              </div>
              <div className={style.form_wrap}>
                <span>*가격</span>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^\d*$/.test(val)) {
                      setPrice(val);
                    }
                  }}
                  placeholder="가격을 입력해주세요"
                  onFocus={() => setPriceFirst(false)}
                  onBlur={() => setPriceFirst(true)}
                />
                {!priceFirst && price == 0 && (
                  <p className={style.errorMessage}>가격을 입력해주세요</p>
                )}
              </div>
              <div className={style.form_wrap}>
                <span>*태그</span>
                <input
                  type="text"
                  placeholder="태그 입력 후 엔터"
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                  }}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setTagsFirst(false)}
                  onBlur={() => setTagsFirst(true)}
                />
                {tags.length > 0 && (
                  <div className={style.tagList}>
                    {tags.map((tag, index) => (
                      <span key={index} className={style.tag}>
                        # {tag}
                        <button type="button" onClick={() => removeTag(index)}>
                          <img src="/assets/ic_X.svg" alt="삭제" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                {((inputValue.length === 0 || inputValue.length > 5) && !tagsFirst) && (
                  <p className={style.errorMessage}>
                    {inputValue.length === 0
                      ? "태그를 입력해주세요"
                      : "5글자 이내로 입력해주세요"}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

