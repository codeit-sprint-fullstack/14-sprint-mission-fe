import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProductValidation } from "../hooks/useProductValidation";
import { createProduct } from "../js/ProductService";

import Header from "../components/Header";
import Footer from "../components/Footer";

import "../styles/Registration.css";

export default function Registration() {
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const { errors, isValid } = useProductValidation({
    name,
    description,
    price,
    tags,
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;
    try {
      const created = await createProduct({
        name,
        description,
        price: Number(price),
        tags,
      });
      navigate(`/items/${created.id}`);
    } catch (err) {
      alert("상품 등록에 실패했습니다.");
    }
  };

  const handleTagKeyDown = (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    const value = tagInput.trim();
    if (!value) return;
    if (value.length > 5) return;
    if (tags.includes(value)) return;
    setTags([...tags, value]);
    setTagInput("");
  };

  const handleRemoveTag = (target) => {
    setTags(tags.filter((t) => t !== target));
  };

  return (
    <>
      <Header />
      <main className="wrapper registration-main">
        <form className="registration-container" onSubmit={handleSubmit}>
          <div className="registration-header">
            <h2>상품 등록하기</h2>
            <button className="submit-button" disabled={!isValid}>
              등록
            </button>
          </div>

          <div className="input-group">
            <label>상품명</label>
            <input
              type="text"
              placeholder="상품명을 입력해주세요"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={errors.name ? "error" : ""}
            />
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>

          <div className="input-group">
            <label>상품 소개</label>
            <textarea
              placeholder="상품 소개를 입력해주세요"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>판매가격</label>
            <input
              type="text"
              placeholder="판매 가격을 입력해주세요"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>태그</label>
            <div className="tag-box">
              <input
                type="text"
                placeholder="태그를 입력해주세요"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
              />
              <div className="tag-list">
                {tags.map((tag) => (
                  <span key={tag} className="tag-chip">
                    #{tag}
                    <button type="button" onClick={() => handleRemoveTag(tag)}>
                      <img src="/images/icons/ic_X.svg" alt="삭제" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </form>
      </main>

      <Footer />
    </>
  );
}
