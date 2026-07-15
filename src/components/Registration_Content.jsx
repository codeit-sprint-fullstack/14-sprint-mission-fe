import style from "../style/Registration_Content.module.css";
import SubmitButton from "./SubmitButton";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Registration_Content() {
  const navigate = useNavigate();
  // 상태 변수들
  const [nameState, setNameState] = useState(false);
  const [nameFirst, setNameFirst] = useState(true);
  const [introState, setIntroState] = useState(false);
  const [introFirst, setIntroFirst] = useState(true);
  const [priceState, setPriceState] = useState(false);
  const [priceFirst, setPriceFirst] = useState(true);
  const [tagsState, setTagsState] = useState(false);
  const [tagsFirst, setTagsFirst] = useState(true);
  const [buttonState, setButtonState] = useState(false);

  const [inputValue, setInputValue] = useState(""); // 태그 input
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "" && inputValue.trim().length <= 5) {
      e.preventDefault();
      const newTag = inputValue.trim();
      if (!tags.some(tag => tag.toLowerCase() === newTag.toLowerCase())) {
        setTags([...tags, newTag]);
      }
      setInputValue("");
    }
  };
  const removeTag = (removeIndex) => {
    setTags(tags.filter((_, index) => index !== removeIndex));
  };

  const handleSubmit = async () => {
    const task = {
      name,
      description: intro,
      price: Number(price),
      tags,
    };

    console.log("최종 객체:", task);
    console.log("post를 진행합니다.");
    try {
      await axios.post("http://localhost:3001/tasks", task);
      console.log("등록 성공");
      navigate("/items"); // 원하는 경로로 이동
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };
  
  // DB 변수값들
  const [name, setName] = useState("");
  const [intro, setIntro] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const nameValid = name.length > 0 && name.length <= 10;
    const introValid = intro.length >= 10 && intro.length <= 100;
    const priceValid = price !== "" && !isNaN(Number(price));

    setNameState(nameValid);
    setIntroState(introValid);
    setPriceState(priceValid);

    setButtonState(nameValid && introValid && priceValid);

  }, [name, intro, price, inputValue]);

  return (
    <div className={style.main}>
      <div className={style.Content}>
        <div className={style.submit}>
            <h2>상품 등록하기</h2>
            <SubmitButton text={'등록'} boolean={buttonState} onClick={handleSubmit}/>
        </div>
        <form className={style.form}>
          <div className={style.itemName}>
            <h2>상품명</h2>
            <input
              name="name"
              placeholder="상품명을 입력해주세요"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setNameFirst(false)}
            />
            {!nameState && !nameFirst && (
              <p>10자 이내로 입력해주세요</p>
            )}
          </div>
          <div className={style.itemIntro}>
            <h2>상품 소개</h2>
            <textarea
              name="description"
              placeholder="상품 소개를 입력해주세요"
              value={intro}
              onChange={(e) => setIntro(e.target.value)}
              onFocus={() => setIntroFirst(false)}
            />
            {!introState && !introFirst && (
              <p>10자 이상 입력해주세요</p>
            )}
          </div>
          <div className={style.itemPrice}>
            <h2>판매가격</h2>
            <input
              name="price"
              placeholder="판매 가격을 입력해주세요"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              onFocus={() => setPriceFirst(false)}
            />
            {!priceState && !priceFirst && (
              <p>숫자로 입력해주세요</p>
            )}
          </div>
          <div className={style.itemTag}>
            <h2>태그</h2>
            <input
              type="text"
              placeholder="태그 입력 후 엔터"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setTagsState(e.target.value.length <= 5);
              }}
              onKeyDown={handleKeyDown}
              onFocus={() => setTagsFirst(false)}
            />
            {tags.length > 0 && (
              <div className={style.tagList}>
                {tags.map((tag, index) => (
                  <span key={index} className={style.tag}>
                    # {tag}
                    <button type="button" onClick={() => removeTag(index)}></button>
                  </span>
                ))}
              </div>
            )}
            {!tagsState && !tagsFirst && (
              <p>5글자 이내로 입력해주세요</p>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default Registration_Content;