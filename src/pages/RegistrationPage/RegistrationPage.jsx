import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegistrationPage.css";

function RegistrationPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState("");

  async function handleSubmit() {
    const cleanedTag = tags.trim().replace("#", "");

    const productData = {
      name: name.trim(),
      description: description.trim(),
      price: Number(price),
      tags: cleanedTag ? [cleanedTag] : [],
      image: "",
    };

    const response = await fetch("http://localhost:3000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      alert("상품 등록에 실패했습니다.");
      return;
    }

    navigate("/items")
  }

  return (
    <main className="registration-page">
      <div className="registration-header">
        <h1 className="registration-title">상품 등록하기</h1>

        <button
          className="registration-button"
          type="button"
          onClick={handleSubmit}
        >
          등록
        </button>
      </div>

      <div className="registration-name">
        <h2 className="name-title">상품명</h2>

        <input
          className="name-input"
          type="text"
          placeholder="상품명을 입력해주세요"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>

      <div className="registration-description">
        <h2 className="description-title">상품 소개</h2>

        <textarea
          className="description-input"
          placeholder="상품 소개를 입력해주세요"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </div>

      <div className="registration-price">
        <h2 className="price-title">판매가격</h2>

        <input
          className="price-input"
          type="number"
          placeholder="판매 가격을 입력해주세요"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
      </div>

      <div className="registration-tags">
        <h2 className="tags-title">태그</h2>

        <input
          className="tags-input"
          type="text"
          placeholder="태그를 입력해주세요"
          value={tags}
          onChange={(e) => {
            setTags(e.target.value);
          }}
        />
      </div>
    </main>
  );
}

export default RegistrationPage;