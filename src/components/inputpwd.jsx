import { useState, useEffect } from "react";
import style from "./inputpwd.module.css";

function InputPwd({ pwdPass, placeholder, type, setPWD, originalPwd, name }) {

  // 변수
  const [inputData, setInputData] = useState('');
  const [first, setFirst] = useState(true);
  const [allow, setAllow] = useState(true);
  const [error1, setError1] = useState(false);
  const [error2, setError2] = useState(false);
  const [showPwd, setShowPwd] = useState(false);  

  useEffect(() => {
    if (first) return;
    if (inputData === "") {
      setError1(true);
      setError2(false);
      setAllow(false);
      pwdPass(false);
    } else {
      if (type === "password") {
        if (inputData.length < 8) {
          setError1(false);
          setError2(true);
          setAllow(false);
          pwdPass(false);
        } else {
          setError1(false);
          setError2(false);
          setAllow(true);
          pwdPass(true);
          setPWD(inputData); // 비밀번호 저장
        }
      } else if (type === "passwordCheck") {
        if (inputData !== originalPwd) {
          setError1(false);
          setError2(true);
          setAllow(false);
          pwdPass(false);
        } else {
          setError1(false);
          setError2(false);
          setAllow(true);
          pwdPass(true);
        }
      }
    }
  }, [inputData, first, originalPwd]);

  return (
    <>
      <div className={ allow ? style.show_word : `${style.show_word} ${style.notAllow}`}>
        <input
          name={name}
          type={showPwd ? "text" : "password"}
          className={style.Password_text}
          placeholder={placeholder}
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          onFocus={() => setFirst(false)}
        />
        <img
          src="/assets/btn_visibility_on_24px.png"
          alt="비밀번호 표시"
          onMouseDown={() => setShowPwd(true)}
          onMouseUp={() => setShowPwd(false)}
          style={{ cursor: "pointer" }}
        />
      </div>
      {error1 && !first && (
        <p className={style.failure_message}>
          비밀번호를 입력해주세요.
        </p>
      )}
      {error2 && !first && (
        <p className={style.failure_message}>
          {type === "password" 
            ? "비밀번호를 8자 이상 입력해주세요." 
            : "비밀번호가 일치하지 않습니다."}
        </p>
      )}
    </>
  )
} 

export default InputPwd;