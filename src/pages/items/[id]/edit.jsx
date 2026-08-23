import { useState, useLayoutEffect, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Footer from "@/components/Footer.jsx";
import Gnb from "@/components/gnb.jsx";
import style from "@/styles/items/[id]/edit.module.css";
import api from "@/utils/api";
import { uploadImage } from "@/utils/imageupload";
import { toast } from "react-toastify";

export default function EditItem() {
  const router = useRouter();
  const { id } = router.query;
  const queryClient = useQueryClient();

  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState([]);
  const [tagsFirst, setTagsFirst] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [existingImage, setExistingImage] = useState(null);

  // 상품 조회
  const { data, isLoading, error } = useQuery({
    queryKey: ["item", id],
    queryFn: async () => {
      const res = await api.get(`/items/${id}`);
      return res.data;
    },
    enabled: router.isReady && !!id,
    onSuccess: (data) => {
      setName(data.name);
      setDescription(data.description);
      setPrice(String(data.price));
      console.log("서버 응답 tags:", data.tags);
      setTags(data.tags || []);
      setExistingImage(data.images?.[0] || null);
    },
  });

  // 상품 수정 Mutation
  const mutation = useMutation({
    mutationFn: async () => {
      let uploadUrl = null;
      if (file) {
        uploadUrl = await uploadImage(file);
      }
      const images = uploadUrl
        ? [uploadUrl]
        : existingImage
          ? [existingImage]
          : [];

      return api.patch(`/items/${id}`, {
        name,
        description,
        price: Number(price),
        tags,
        images,
      });
    },
    onSuccess: () => {
      toast.success("상품이 수정되었습니다!");
      queryClient.invalidateQueries(["item", id]); // 캐시 갱신
      router.replace(`/items/${id}`);
    },
    onError: (err) => {
      console.error("수정 에러:", err);
      toast.error("수정 중 문제가 발생했습니다.");
    },
  });

  const isDisabled =
    name.trim() === "" ||
    description.trim() === "" ||
    String(price).trim() === "" ||
    tags.length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate();
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


  useEffect(() => {
    if (data) {
      setName(data.name || "");
      setDescription(data.description || "");
      setPrice(String(data.price || ""));
      setTags(data.tags || []);
      setExistingImage(data.images?.[0] || null);
    }
  }, [data]);




  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>상품을 불러오지 못했습니다.</div>;


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
                {Array.isArray(tags) && tags.length > 0 && (
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
