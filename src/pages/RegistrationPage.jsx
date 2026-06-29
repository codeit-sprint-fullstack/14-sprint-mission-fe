import Header from "../components/Header";
import Footer from "../components/Footer";
import FormField from "../components/FormField";
import "./RegistrationPage.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegistrationPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);

  function handleTagKeyDown(e) {
    if (e.nativeEvent.isComposing) return;
    if (e.key !== "Enter") return;

    e.preventDefault();

    const newTag = tagInput.trim();

    if (newTag === "") return;
    if (newTag.length > 5) return;
    if (tags.includes(newTag)) return;

    setTags([...tags, newTag]);
    setTagInput("");
  }

  function handleRemoveTag(removeTag) {
    setTags(tags.filter((tag) => tag !== removeTag));
  }

  const isSubmitDisabled =
    name.trim() === "" ||
    description.trim() === "" ||
    price.trim() === "" ||
    tags.length === 0;

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = {
      name,
      description,
      price: Number(price),
      tags: tags,
    };

    const response = await axios.post(
      "http://localhost:3000/products",
      formData,
    );

    console.log(response.data);

    navigate(`/items/${response.data._id}`);
  }
  return (
    <>
      <Header />
      <main className="registration-page">
        <form className="registration-form" onSubmit={handleSubmit}>
          <div className="registration-header">
            <h3>상품 등록하기</h3>
            <button type="submit" disabled={isSubmitDisabled}>
              등록
            </button>
          </div>

          <FormField
            label="상품명"
            placeholder="상품을 입력해주세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>
            상품 소개
            <textarea
              placeholder="상품 소개를 입력해주세요"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>

          <FormField
            label="판매가격"
            type="number"
            placeholder="판매 가격을 입력해주세요"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <div className="tag-field-group">
            <FormField
              label="태그"
              placeholder="태그를 입력해주세요"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
            />

            {tags.length > 0 && (
              <div className="tag-chip-list">
                {tags.map((tag) => (
                  <div className="tag-chip" key={tag}>
                    <span className="tag-chip-text">#{tag}</span>

                    <button
                      type="button"
                      className="tag-chip-remove"
                      onClick={() => handleRemoveTag(tag)}
                      aria-label={`${tag} 태그 삭제`}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </form>
      </main>
      <Footer />
    </>
  );
}

export default RegistrationPage;
