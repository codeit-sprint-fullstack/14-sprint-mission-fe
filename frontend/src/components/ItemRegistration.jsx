import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import ItemTag from "./ItemTag.jsx";

function ItemRegistration() {
  const navigate = useNavigate();
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    tags: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleKeyDown = (e) => {
    if (e.key !== "Enter") return;
    if (e.nativeEvent.isComposing) return;

    e.preventDefault();

    const value = e.target.value.trim();

    if (!value) return;

    // 중복 방지
    if (tags.includes(value)) {
      setTagInput("");
      return;
    }

    setTags((prev) => [...prev, value]);
    setTagInput("");
  };

  const handleDeleteTag = (deleteTag) => {
    setTags((prev) => prev.filter((tag) => tag !== deleteTag));
  };

  const validate = () => {
    const newErrors = {};

    const name = formData.name.trim();
    const description = formData.description.trim();
    const price = formData.price.trim();

    // 상품명: 1자 이상, 10자 이내
    if (!name) {
      newErrors.name = "상품명을 입력해주세요.";
    } else if (name.length > 10) {
      newErrors.name = "상품명은 10자 이내로 입력해주세요.";
    }

    // 상품 소개: 10자 이상, 100자 이내
    if (!description) {
      newErrors.description = "상품 소개를 입력해주세요.";
    } else if (description.length < 10) {
      newErrors.description = "상품 소개는 10자 이상 입력해주세요.";
    } else if (description.length > 100) {
      newErrors.description = "상품 소개는 100자 이내로 입력해주세요.";
    }

    // 판매 가격: 1자 이상, 숫자
    if (!price) {
      newErrors.price = "판매 가격을 입력해주세요.";
    } else if (isNaN(Number(price))) {
      newErrors.price = "가격은 숫자로 입력해주세요.";
    }

    // 태그: 각 태그 5글자 이내
    if (!tags || tags.length === 0) {
      newErrors.tags = "태그를 입력해주세요.";
    } else if (tags.some((tag) => tag.trim().length > 5)) {
      newErrors.tags = "태그는 5글자 이내로 입력해주세요.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validate();
    if (!isValid) return;

    try {
      const response = await axios.post("/items", {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        tags: tags,
      });

      alert("상품이 등록되었습니다.");
      navigate(`/items/${response.data._id}`);
    } catch (error) {
      console.error(error);
      alert("상품 등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <main id="main" style={{ padding: "24px 0" }}>
      <section>
        <div className="inner">
          <form onSubmit={handleSubmit}>
            <div className="section_title">
              <p>상품 등록하기</p>
              <button type="submit" className="regist_item_btn">
                등록
              </button>
            </div>

            <div className="input_wrap">
              <label htmlFor="name">상품명</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="상품명을 입력해주세요."
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <p className="validation_msg item">{errors.name}</p>
              )}
            </div>

            <div className="input_wrap">
              <label htmlFor="description">상품 소개</label>
              <textarea
                id="description"
                name="description"
                placeholder="상품 소개를 입력해주세요."
                rows={6}
                value={formData.description}
                onChange={handleChange}
              />
              {errors.description && (
                <p className="validation_msg item">{errors.description}</p>
              )}
            </div>

            <div className="input_wrap">
              <label htmlFor="price">판매 가격</label>
              <input
                id="price"
                name="price"
                type="text"
                placeholder="판매 가격을 입력해주세요."
                value={formData.price}
                onChange={handleChange}
              />
              {errors.price && (
                <p className="validation_msg item">{errors.price}</p>
              )}
            </div>

            <div className="input_wrap">
              <label htmlFor="tags">태그</label>
              <input
                id="tags"
                name="tags"
                type="text"
                placeholder="태그를 입력해주세요. 예: 전자기기, 노트북"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <div className="tag_wrap">
                <ItemTag tags={tags} onDelete={handleDeleteTag} />
              </div>
              {errors.tags && (
                <p
                  className="validation_msg item
              _msg"
                >
                  {errors.tags}
                </p>
              )}
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

export default ItemRegistration;
