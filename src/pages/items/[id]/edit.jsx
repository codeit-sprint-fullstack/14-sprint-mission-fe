import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Footer from "@/components/Footer.jsx";
import Gnb from "@/components/gnb.jsx";
import style from "@/styles/items/[id]/edit.module.css";
import api from "@/utils/api";
import { uploadImage } from "@/utils/imageupload"; // 이미지 업로드 유틸

export default function EditItem() {
  const router = useRouter();
  const { id } = router.query;

  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState([]);
  const [tagsFirst, setTagsFirst] = useState(true);
  const [inputValue, setInputValue] = useState("");

  const isDisabled = name.trim() === "" || description.trim() === "" || price.trim() === "" || !file || tags.length === 0;


  useEffect(() => {
    if (id) {
      api.get(`/items/${id}`)
        .then((res) => {
          setName(res.data.name);
          setDescription(res.data.description);
          setPrice(String(res.data.price)); // 숫자를 문자열로 변환
          setTags(res.data.tags || []);
        })
        .catch((err) => {
          console.error("상품 불러오기 에러:", err);
          alert("상품을 불러오지 못했습니다.");
        });
    }
  }, [id]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let uploadUrl = null;

      // 1. 이미지 업로드 (파일 선택 시)
      if (file) {
        uploadUrl = await uploadImage(file);
      }

      // 2. 상품 수정 (PATCH)
      const res = await api.patch(`/items/${id}`, {
        name,
        description,
        price: Number(price), // 서버에 보낼 때 숫자로 변환
        tags,
        images: uploadUrl ? [uploadUrl] : undefined,
      });

      if (res.status === 200) {
        alert("상품이 수정되었습니다!");
        router.push(`/items/${id}`);
      } else {
        alert("수정 실패: " + (res.data?.error || "알 수 없는 오류"));
      }
    } catch (error) {
      console.error("수정 에러:", error);
      alert("수정 중 문제가 발생했습니다.");
    }
  };

  const handleKeyDown = (e) => {
    if (
      e.key === "Enter" &&
      inputValue.trim() !== "" &&
      inputValue.trim().length <= 5
    ) {
      e.preventDefault();
      const newTag = inputValue.trim();
      if (!tags.some((tag) => tag.toLowerCase() === newTag.toLowerCase())) {
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
              <span>상품 수정</span>
              <button className={style.submitButton} disabled={isDisabled} onClick={handleSubmit}>
                <span>저장</span>
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className={style.form_wrap}>
                <span>*상품명</span>
                <input
                  type="text"
                  placeholder="상품명을 입력해주세요"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className={style.form_wrap}>
                <span>*설명</span>
                <textarea
                  placeholder="상품 설명을 입력해주세요"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className={style.form_wrap}>
                <span>*가격</span>
                <input
                  type="number"
                  placeholder="가격을 입력해주세요"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className={style.form_wrap}>
                <span>*이미지 파일</span>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
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
