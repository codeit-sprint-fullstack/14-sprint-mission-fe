import style from "./dropdown_list.module.css";
import React, { useState } from "react";

function Dropdown_list({ options, onSelect }) {
  return (
    <ul className={style.dropdown_list}>
      {options.map((option, idx) => (
        <li key={idx} onClick={() => onSelect(option)}>
          {option}
        </li>
      ))}
    </ul>
  );
}

export default Dropdown_list;
