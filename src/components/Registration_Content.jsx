import style from "../style/Registration_Content.module.css";
import SubmitButton from "./SubmitButton";
import { useEffect, useState } from "react";

function Registration_Content() {
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
  
  // DB 변수값들
  const [name, setName] = useState("");
  const [intro, setIntro] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState([]);

  useEffect(() => {
    setButtonState(false);

    if (name.length > 0 && name.length <= 10) {
      setNameState(true);
    } else {
      setNameState(false);
    }

    if (intro.length >= 10 && intro.length <= 100) {
      setIntroState(true);
    } else {
      setIntroState(false);
    }

    if (!isNaN(Number(price))) {
      setPriceState(true);
    } else {
      setPriceState(false);
    }



    if (nameState && introState && priceState) {
      setButtonState(true);
      console.log(buttonState);
    } else {
      setButtonState(false);
      console.log(buttonState);
    }

    // console.log("Name : " + name);
    // console.log("Intro : " + intro);
    // console.log("Price : " + price);
  }, [name, intro, price])

  return (
    <div className={style.main}>
      <div className={style.Content}>
        <div className={style.submit}>
            <h2>상품 등록하기</h2>
            <SubmitButton text={'등록'} boolean={buttonState}/>
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
              name="tags"
              placeholder="태그를 입력해주세요"
              onFocus={() => setTagsFirst(false)}
            />
            <p>5글자 이내로 입력해주세요</p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Registration_Content;