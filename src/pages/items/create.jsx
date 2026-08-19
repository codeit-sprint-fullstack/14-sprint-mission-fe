import { useState } from "react";
import { useRouter } from "next/router";
import Footer from "@/components/Footer";
import Gnb from "@/components/gnb";
import style from "@/styles/items/create.module.css";
import { uploadImage } from "@/utils/imageupload";
import api from "@/utils/api";

export default function CreateProduct() {
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState([]);
  const [tagsFirst, setTagsFirst] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [titleFirst, setTitleFirst] = useState(true);
  const [contentFirst, setContentFirst] = useState(true);
  const [priceFirst, setPriceFirst] = useState(true);


  const isDisabled = title.trim() === "" || content.trim() === "" || price.trim() === "" || !file || tags.length === 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!file) {
        alert("이미지를 선택해주세요");
        return;
      }

      // 1. 이미지 업로드
      const uploadUrl = await uploadImage(file);
      setImageUrl(uploadUrl);

      // 2. 상품 등록
      const res = await api.post("/items/create", {
        images: [uploadUrl],
        tags,
        price: Number(price),
        description: content,
        name: title,
      });

      if (res.status >= 200 && res.status < 300) {
        const newProduct = res.data;
        alert("상품이 등록되었습니다!");
        router.push(`/items/${newProduct.id}`);
      } else {
        alert("등록 실패: " + (res.data?.error || "알 수 없는 오류"));
      }
    } catch (error) {
      console.error("등록 에러:", error);
      alert("등록 중 문제가 발생했습니다.");
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
                <span>*이미지 URL</span>
                <input
                  type="file"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                  }}
                />
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

