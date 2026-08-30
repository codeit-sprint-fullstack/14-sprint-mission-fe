"use client";

import axios from "axios";
import style from "./page.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

const API_BASE_URL = "http://localhost:3001";

function Registration() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleImageChange = (event) => {
    const selectedFiles = Array.from(event.target.files ?? []);
    const remainingCount = 3 - imageFiles.length;

    if (selectedFiles.length > remainingCount) {
      alert("이미지는 최대 3개까지 등록할 수 있습니다.");
      event.target.value = "";
      return;
    }

    const nextPreviews = selectedFiles.map((file) => URL.createObjectURL(file));

    setImageFiles((previous) => [...previous, ...selectedFiles]);
    setImagePreviews((previous) => [...previous, ...nextPreviews]);

    event.target.value = "";
  };

  const handleImageRemove = (removeIndex) => {
    setImageFiles((previous) =>
      previous.filter((_, index) => index !== removeIndex),
    );

    setImagePreviews((previous) =>
      previous.filter((_, index) => index !== removeIndex),
    );
  };

  const postItems = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        alert("로그인이 필요합니다.");
        router.push("/signin");
        return;
      }

      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      let uploadedImages = [];

      if (imageFiles.length > 0) {
        const formData = new FormData();

        imageFiles.forEach((file) => {
          formData.append("images", file);
        });

        const uploadResponse = await axios.post(
          `${API_BASE_URL}/uploads/images`,
          formData,
          {
            headers,
          },
        );

        uploadedImages = uploadResponse.data.images;
      }

      const tagList = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);

      await axios.post(
        `${API_BASE_URL}/products`,
        {
          name,
          description,
          price: Number(price),
          tags: tagList,
          images: uploadedImages,
        },
        {
          headers,
        },
      );

      router.push("/items");
    } catch (error) {
      const message =
        error.response?.data?.message ?? "상품 등록에 실패했습니다.";

      alert(message);
    }
  };

  return (
    <>
      <div className="register-head">
        <h2 className={style.title}>상품 등록하기</h2>
        <button className={style.registerButton} onClick={postItems}>
          등록
        </button>
      </div>

      <div className="register-body">
        <h3>상품 이미지</h3>

        <div className={style.imageList}>
          {imageFiles.length < 3 && (
            <label className={style.imageUpload}>
              <span className={style.plusIcon}>+</span>
              <span>이미지 등록</span>

              <input
                className={style.imageInput}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
            </label>
          )}

          {imagePreviews.map((previewUrl, index) => (
            <div className={style.previewItem} key={previewUrl}>
              <img
                className={style.previewImage}
                src={previewUrl}
                alt="상품 이미지"
              />

              <button
                className={style.removeImageButton}
                type="button"
                onClick={() => handleImageRemove(index)}
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <h3>상품명</h3>
        <input
          className="inputBox"
          type="text"
          placeholder="상품명을 입력해주세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>

        <h3>상품 소개</h3>
        <input
          className="bigInputBox"
          type="text"
          placeholder="상품 소개를 입력해주세요"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></input>

        <h3>판매가격</h3>
        <input
          className="inputBox"
          type="number"
          placeholder="판매 가격을 입력해주세요"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        ></input>

        <h3>태그</h3>
        <input
          className="inputBox tag"
          type="text"
          placeholder="태그를 입력해주세요"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        ></input>
      </div>
    </>
  );
}

export default Registration;
