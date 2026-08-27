import style from "./dropdown.module.css";
import React, { useState } from "react";
import Dropdown_list from "./dropdown_list.jsx";
/* 
  Dropdown 컴포넌트입니다.
  options : {[]} Dropdown_list의 options를 위한 파라미터입니다. 배열을 넣어주세요.
  onChange : {} Form 작성을 위한 Value 값 내보내는 파라미터입니다.

  ex)
  <Dropdown options={[1, 2, 3]} onChange={(value) => console.log(value)}/>
 */
function Dropdown({ options, onChange }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleSelect = (value) => {
    setSelected(value);
    setOpen(false);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <>
      <div className={style.dropdown_wrap}>
        <div className={style.frame} onClick={() => setOpen(!open)}>
          <p>{selected || options[0]}</p>
          <img src="/assets/ic_arrow_down.svg" alt="토글" />
        </div>
        {open && (
          <Dropdown_list options={options} onSelect={handleSelect} />
        )}
      </div>
    </>
  );
}

export default Dropdown;
