import { useState, useEffect, useRef } from "react";
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

  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState([]);
  const [tagsFirst, setTagsFirst] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [existingImages, setExistingImages] = useState([]);
  const fileInputRef = useRef(null);

  // 숨겨진 input 클릭
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  // 이미지 파일 확인
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    // 최대 3장 제한
    if (existingImages.length + selectedFiles.length > 3) {
      toast("이미지는 최대 3개까지 등록 가능합니다.");
      return;
    }
    // 상태 업데이트
    setFiles((prev) => [...prev, ...selectedFiles]);
    // 미리보기 URL 추가
    const previewUrls = selectedFiles.map((file) => URL.createObjectURL(file));
    setExistingImages((prev) => [...prev, ...previewUrls]);
  };

  // 이미지 삭제
  const handleDeleteImage = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };



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
      setTags(data.tags || []);
      setExistingImages(data.images || []);
    },
  });

  // 상품 수정 Mutation
  const mutation = useMutation({
    mutationFn: async () => {
      const uploadUrls = [];

      // 여러 파일 업로드 처리
      for (const f of files) {
        const url = await uploadImage(f);
        uploadUrls.push(url);
      }

      // 최종 images 배열 구성
      const images = [
        ...existingImages.filter((img) => img.startsWith("http")), // 기존 서버 URL 유지
        ...uploadUrls, // 새 업로드 URL 추가
      ];

      return api.patch(`/items/${id}`, {
        name,
        description,
        price: Number(price),
        tags,
        images, // 배열 전체 전달
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
    tags.length === 0 ||
    existingImages.length === 0;

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
      setExistingImages(data.images || null);
    }
  }, [data]);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>상품을 불러오지 못했습니다.</div>;


  return (
    <>
      <Gnb />
      <main className={style.main}>
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
                <span>*이미지 파일 (최대 3개)</span>
                <div className={style.img_wrap}>
                  <div
                    className={style.img_upload}
                    onClick={() => {
                      if (existingImages.length >= 3) {
                        toast(
                          <div>
                            이미지는 최대 3장만 등록할 수 있습니다.<br />
                            기존 이미지를 삭제하세요.
                          </div>
                        );
                        return;
                      }
                      handleUploadClick();
                    }}
                  >
                    <div className={style.upload_wrap}>
                      <img src="/assets/ic_plus.svg" alt="plus" />
                      <span>이미지 등록</span>
                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>
                  {Array.isArray(existingImages) &&
                    existingImages.map((img, index) => (
                      <div key={index} className={style.img_sample}>
                        <img src={img} alt={`sample-${index}`} className={style.background} />
                        <img
                          src="/assets/ic_X.svg"
                          alt="delete"
                          className={style.delete}
                          onClick={() => handleDeleteImage(index)}
                        />
                      </div>
                    ))}
                </div>
              </div>
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
