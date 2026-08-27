import api from "@/utils/api";

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await api.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  if (res.status !== 200) throw new Error("이미지 업로드 실패");
  return res.data.url;
};

