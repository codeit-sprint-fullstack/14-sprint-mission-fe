import useProductValidation from "../../hooks/useProductValidation.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegistrationPage.css";
import xIcon from "../../assets/ic_X.png";

function RegistrationPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const { isFormValid } = useProductValidation({
    name,
    description,
    price,
  });

  function handleTagKeyDown(e) {
    if (e.key !== "Enter") {
      return;
    }

    e.preventDefault();

    const newTag = tagInput.trim().replace("#", "");

    if (newTag === "") {
      return;
    }

    if (tags.includes(newTag)) {
      setTagInput("");
      return;
    }

    setTags([...tags, newTag]);
    setTagInput("");
  }

  function handleRemoveTag(tagToRemove) {
    const nextTags = tags.filter((tag) => tag !== tagToRemove)
    setTags(nextTags);
  }

  async function handleSubmit() {
    if (!isFormValid || isSubmitting) {
      return;
    }

    const productData = {
      name: name.trim(),
      description: description.trim(),
      price: Number(price),
      tags: tags,
      image: "",
    };

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error("상품 등록에 실패했습니다.");
      }

      const createdProduct = await response.json();

      navigate(`/items${createdProduct.id}`);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="registration-page">
      <header className="registration-header">
        <h1 className="registration-title">상품 등록하기</h1>

        <button
          className="registration-button"
          type="button"
          onClick={handleSubmit}
          disabled={!isFormValid || isSubmitting}
        >
          {isSubmitting ? "등록 중" : "등록"}
        </button>
      </header>

      <section className="registration-section">
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
            value={tagInput}
            onChange={(e) => {
              setTagInput(e.target.value);
            }}
            onKeyDown={handleTagKeyDown}
          />

          <div className="tag-list">
            {tags.map((tag) => (
              <span className="tag-chip" key={tag}>
                #{tag}

                <button
                  className="tag-remove"
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                >
                  <img src={xIcon} alt="태그 삭제" />
                </button>
              </span>
            ))}
          </div>
        </div>
      </section>

      {error && (
        <p className="registration-error">
          {error}
        </p>
      )}
    </main>
  );
}

export default RegistrationPage;