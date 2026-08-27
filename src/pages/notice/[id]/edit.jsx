import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Footer from "@/components/Footer.jsx";
import Gnb from "@/components/gnb.jsx";
import style from "@/styles/items/[id]/edit.module.css";
import api from "@/utils/api";
import { uploadImage } from "@/utils/imageupload";
import { toast } from "react-toastify";

export default function EditNotice() {
  const router = useRouter();
  const { id } = router.query;
  const queryClient = useQueryClient();

  const [file, setFile] = useState(null); // ✅ 단일 파일만 관리
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [existingImage, setExistingImage] = useState(""); // ✅ 문자열로 관리
  const fileInputRef = useRef(null);

  // 숨겨진 input 클릭
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  // 이미지 파일 확인
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (existingImage) {
      toast("이미지는 최대 1개만 등록 가능합니다.");
      return;
    }

    setFile(selectedFile);
    const previewUrl = URL.createObjectURL(selectedFile);
    setExistingImage(previewUrl); // 미리보기용 URL
  };

  // 이미지 삭제
  const handleDeleteImage = () => {
    setFile(null);
    setExistingImage("");
  };

  // 게시글 조회
  const { data, isLoading, error } = useQuery({
    queryKey: ["notice", id],
    queryFn: async () => {
      const res = await api.get(`/notice/${id}`);
      return res.data;
    },
    enabled: router.isReady && !!id,
    onSuccess: (data) => {
      setName(data.title || "");
      setDescription(data.content || "");
      setExistingImage(data.images?.[0] || ""); // images 배열 → 첫 이미지
    },
  });

  // 게시글 수정 Mutation
  const mutation = useMutation({
    mutationFn: async () => {
      let finalImage = existingImage;

      if (file) {
        finalImage = await uploadImage(file);
      }

      const res = await api.patch(`/notice/${id}`, {
        title: name,
        content: description,
        images: finalImage ? [finalImage] : [],
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("게시글이 수정되었습니다!");
      queryClient.invalidateQueries(["notice", id]);
      router.replace(`/notice/${id}`);
    },
    onError: (err) => {
      console.error("수정 에러:", err);
      if (!err?.__toastShown) toast.error("수정 중 문제가 발생했습니다.");
    },
  });

  const isDisabled =
    name.trim() === "" ||
    description.trim() === "";

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate();
  };

  useEffect(() => {
    if (data) {
      setName(data.title || "");
      setDescription(data.content || "");
      setExistingImage(data.images?.[0] || "");
    }
  }, [data]);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>게시글을 불러오지 못했습니다.</div>;

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
                <span>*이미지 파일 (최대 1개)</span>
                <div className={style.img_wrap}>
                  <div
                    className={style.img_upload}
                    onClick={() => {
                      if (existingImage) {
                        toast(
                          <div>
                            이미지는 최대 1장만 등록할 수 있습니다.<br />
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

                  {existingImage && (
                    <div className={style.img_sample}>
                      <img src={existingImage} alt="sample" className={style.background} />
                      <img
                        src="/assets/ic_X.svg"
                        alt="delete"
                        className={style.delete}
                        onClick={handleDeleteImage}
                      />
                    </div>
                  )}
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
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
