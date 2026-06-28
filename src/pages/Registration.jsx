import { useState } from "react";
import { Link } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

import "../styles/Registration.css";

export default function Registration() {
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  return (
    <>
      <Header />
      <main className="wrapper registration-main">
        <div className="registration-container">
          <div className="registration-header">
            <h2>상품 등록하기</h2>
            <button className="submit-button" disabled>
              등록
            </button>
          </div>

          <div className="input-group">
            <label>상품명</label>
            <input type="text" placeholder="상품명을 입력해주세요" />
          </div>

          <div className="input-group">
            <label>상품 소개</label>
            <textarea placeholder="상품 소개를 입력해주세요" />
          </div>

          <div className="input-group">
            <label>판매가격</label>
            <input type="text" placeholder="판매 가격을 입력해주세요" />
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
                {tags.map((tag, index) => (
                  <span key={index} className="tag-chip">
                    #{tag}
                    <button
                      onClick={() =>
                        setTags(tags.filter((_, i) => i !== index))
                      }
                    >
                      <img src="images/icons/ic_X.svg" alt="삭제" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
