"use client";

import xIcon from "@/assets/ic_X.png";
import Image from "next/image";
import { useState } from "react";
import styles from "./TagInput.module.css";

export default function TagInput({
  label,
  type,
  id,
  tags,
  setTags,
  placeholder,
}) {
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState("");

  // 에러 처리
  function handleChange(e) {
    const nextValue = e.target.value;

    if (nextValue.length > 5) {
      setInputError("5글자 이내로 입력해주세요");
      return;
    }

    setInputValue(nextValue);
    setInputError("");
  }

  // 엔터 키 눌렀을 때 인풋 값이 쌓이도록 설정
  function handleEnter(e) {
    if (e.nativeEvent.isComposing) return; // 엔터 입력 시 한글 중복 입력 방지
    if (e.key !== "Enter") return;
    e.preventDefault();

    // 예외 처리
    const value = inputValue.trim();
    if (!value) return;
    if (value.length > 5) return;
    if (tags.includes(value)) return;

    setTags([...tags, value]);
    setInputValue("");
  }

  function handleTagDelete(tagToDelete) {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  }

  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        className={`${styles.input} ${inputError ? styles.error : ""}`}
        type={type}
        id={id}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleEnter}
      />
      {inputError && <p className={styles.errorText}>{inputError}</p>}
      {tags.map((tag) => (
        <input key={tag} type="hidden" name="tags" value={tag} />
      ))}
      <div className={styles.tagChips}>
        {tags.map((tag) => (
          <div key={tag} className={styles.chip}>
            <span>#{tag}</span>
            <button
              className={styles.deleteBtn}
              type="button"
              onClick={() => handleTagDelete(tag)}
            >
              <Image src={xIcon} width={22} height={24} alt="태그 삭제" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
