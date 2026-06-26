import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";

function ItemRegistration() {
  const navigate = useNavigate();

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

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "상품명을 입력해주세요.";
    }

    if (!formData.description.trim()) {
      newErrors.description = "상품 소개를 입력해주세요.";
    }

    if (!formData.price.trim()) {
      newErrors.price = "판매 가격을 입력해주세요.";
    } else if (isNaN(Number(formData.price))) {
      newErrors.price = "가격은 숫자로 입력해주세요.";
    }

    if (!formData.tags.trim()) {
      newErrors.tags = "태그를 입력해주세요.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const isValid = validate();
  if (!isValid) return;

  try {
    const response = await axios.post('/items', {
      name: formData.name,
      description: formData.description,
      price: Number(formData.price),
      tags: formData.tags.split(",").map((tag) => tag.trim()),
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
              {errors.name && <p className="validation_msg item">{errors.name}</p>}
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
              {errors.price && <p className="validation_msg item">{errors.price}</p>}
            </div>

            <div className="input_wrap">
              <label htmlFor="tags">태그</label>
              <input
                id="tags"
                name="tags"
                type="text"
                placeholder="태그를 입력해주세요. 예: 전자기기, 노트북"
                value={formData.tags}
                onChange={handleChange}
              />
              {errors.tags && <p className="validation_msg item
              _msg">{errors.tags}</p>}
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

export default ItemRegistration;