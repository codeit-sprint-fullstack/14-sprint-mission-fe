import { useState, useEffect } from "react";
import style from '../style/InputEmail.module.css'

function inputEmail() {

  // 변수
  const [inputData, setInputData] = useState('');
  const [first, setFirst] = useState(true);
  const [allow, setAllow] = useState(true);
  const [error1, setError1] = useState(false);
  const [error2, setError2] = useState(false);

  useEffect(() => {
    if (first) return;
    if (inputData === "") {
      setError1(true);
      setError2(false);
      setAllow(false);
    } else {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(inputData)) {
        setError1(false);
        setError2(true);
        setAllow(false);
      } else {
        setError1(false);
        setError2(false);
        setAllow(true);
      }
    }
  }, [inputData]);

  return (
    <>
      <input
        type="text"
        className={ allow ? style.text_section : `${style.text_section} ${style.notAllow}`}
        placeholder="이메일을 입력해주세요"
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
        onBlur={() => setFirst(false)}
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