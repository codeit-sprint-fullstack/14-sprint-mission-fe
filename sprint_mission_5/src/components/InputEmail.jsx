import { useState, useEffect } from "react";
import style from '../style/InputEmail.module.css'
import { all } from "axios";

function inputEmail({ emailPass }) {

  // 변수
  const [inputData, setInputData] = useState("");
  const [first, setFirst] = useState(true);
  const [allow, setAllow] = useState(true);
  const [error1, setError1] = useState(false);
  const [error2, setError2] = useState(false);
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9._-]{2,4}$/i; // mail 주소 [a-zA-Z0-9._-] , @ 필수, 도메인 주소 [a-zA-Z0-9.-], . 필수, com, net, co.kr 부분[a-zA-Z0-9.-]

  useEffect(() => {
    if (first) return;
    if (inputData === "") {
      setError1(true);
      setError2(false);
      setAllow(false);
      emailPass(false);
    } else {
      if (!regex.test(inputData)) {
        setError1(false);
        setError2(true);
        setAllow(false);
        emailPass(false);
      } else {
        setError1(false);
        setError2(false);
        setAllow(true);
        emailPass(true);
      }
    }
  }, [inputData, first]);

  return (
    <>
      <input
        type="text"
        className={ allow ? style.text_section : `${style.text_section} ${style.notAllow}`}
        placeholder="이메일을 입력해주세요"
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
        onBlur={() => {setFirst(false)}}
      />
      {error1 && !first && (
      <p className={style.failure_message}>
        이메일을 입력해주세요.
      </p>
      )}
      {error2 && !first && (
      <p className={style.failure_message}>
        잘못된 이메일 형식입니다.
      </p>
      )}
    </>
  );
}

export default inputEmail;