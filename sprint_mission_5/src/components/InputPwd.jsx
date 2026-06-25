import { useState, useEffect } from "react";
import style from "../style/InputPwd.module.css";
import visuablity from "../assets/btn_visibility_on_24px.png";

function InputPwd() {

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
    } else {
      if (inputData.length < 8) {
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
      <div className={ allow ? style.show_word : `${style.show_word} ${style.notAllow}`}>
        <input
          type={showPwd ? "txt" : "password"}
          className={style.Password_text}
          placeholder="비밀번호를 입력해주세요"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          onBlur={() => setFirst(false)}
        />
        <img
          src={visuablity}
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
      <div className={style.failure_message}>
          비밀번호를 8자 이상 입력해주세요.
      </div>
      )}
    </>
  )
}

export default InputPwd;