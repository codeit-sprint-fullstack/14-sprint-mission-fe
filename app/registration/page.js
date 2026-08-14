import axios from "axios";
import style from "./page.module.css";
import { useState } from "react";

function Registration() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState("");

  const postItems = async () => {
    try {
      const res = await axios.post(
        `https://one4-sprint-mission-fe-1.onrender.com/products`,
        {
          name: name,
          description: description,
          price: Number(price),
          tags: tags,
        },
      );

      setName("");
      setDescription("");
      setPrice("");
      setTags("");
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <>
      <div className="register-head">
        <h2 className="title">상품 등록하기</h2>
        <button className="registerButton" onClick={postItems}>
          등록
        </button>
      </div>

      <div className="register-body">
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
